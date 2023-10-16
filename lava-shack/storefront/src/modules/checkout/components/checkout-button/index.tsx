import {
  CardInfomation,
  CheckoutFormValues,
  useCheckout,
} from "@lib/context/checkout-context"
import { trackEvent } from "@lib/pixel"
import Button from "@modules/common/components/button"
import Spinner from "@modules/common/icons/spinner"
import { watch } from "fs"
import { useCart } from "medusa-react"
import { useRouter } from "next/router"

import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

import moment from "moment"
import _ from "lodash"

export default function CheckoutButton() {
  const [notReady, setNotReady] = useState(true)
  const {
    cart,
    addShippingMethod,
    completeCheckout: { mutateAsync: completeCart },
  } = useCart()

  const { getValues, formState, watch, handleSubmit } =
    useFormContext<CheckoutFormValues>()
  const [expMon, expYear, cardNumber, cardCvc] = watch([
    "card_expMon",
    "card_expYear",
    "card_number",
    "card_cvc",
  ])

  const { isDirty, isValid, errors } = formState
  useEffect(() => {
    setNotReady(true)
    // console.log({ isDirty, isValid, errors })

    if (!cart) {
      return
    }

    if (!isDirty || !isValid || Object.keys(errors).length > 0) {
      return
    }

    // if (!cart.shipping_address) {
    //   return
    // }

    // if (!cart.billing_address) {
    //   return
    // }

    // if (!cart.email) {
    //   return
    // }

    if (cart.shipping_methods.length < 1) {
      return
    }

    // if (!window.sessionStorage.getItem("c_myuser_token")) {
    //   return
    // }
    // if (!done) {
    //   return
    // }

    const exp = moment.utc(`${expYear}-${expMon}`, "YYYY-MM").endOf("M")
    const valid = moment.utc().startOf("M")
    if (exp.isBefore(valid, "d")) {
      return
    }

    setNotReady(false)
  }, [cart, isDirty, isValid, expMon, expYear])

  const [submitting, setSubmitting] = useState(false)
  const { setAddresses, mpay, cardElementId } = useCheckout()

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const { replace, push } = useRouter()

  const handleCheckout = async (ev: React.MouseEvent) => {
    // console.log({ cart })
    // trackEvent("Purchase", {
    //   currency: cart?.region.currency_code.toUpperCase(),
    //   value: (cart?.total || 0) / 100,
    //   description: "purchase order",
    //   content_type: "product",
    //   quantity: cart?.items.length,
    //   content_ids: cart?.items.map((line) => line.variant_id),
    //   contents: cart?.items.map((item) => ({
    //     content_id: item.variant_id,
    //     content_name: item.variant.title,
    //     quantity: item.quantity,
    //     price: item.unit_price / 100,
    //   })),
    // })

    setErrorMessage(undefined)
    setSubmitting(true)

    try {
      await handleSubmit(setAddresses)()
    } catch (err) {
      console.log({ err })
      // setErrorMessage(err.message)
      setSubmitting(false)
      return
    }

    if (mpay.implementDirect) {
      const cardInfo = getValues()
      // console.log({ cardInfo })

      if (!cardInfo.card_number || !cardInfo.card_cvc) {
        setSubmitting(false)
        setErrorMessage("Please check the card details and try again.")
        return
      }

      const verifiedCard = await fetch("/api/verify-card", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          card: cardInfo,
          amount: cart?.total ?? 0,
          cart_id: cart?.id,
        }),
      })
        .then((res) => res.json())
        .catch((_) => undefined)

      if (!verifiedCard || verifiedCard.error) {
        // console.log({ verifiedCard, action: verifiedCard.error.action })

        if (
          verifiedCard &&
          verifiedCard.error.action &&
          verifiedCard.error.action.name === "require_auth"
        ) {
          push(verifiedCard.error.action.redirect_url)
          return
        }

        setErrorMessage(
          verifiedCard?.error?.message ??
            "Please check the card details and try again."
        )
        // setErrorMessage("Please check the card details and Try again.")
        setSubmitting(false)
        return
      }

      const { data: order } = await completeCart()

      await fetch("/api/paynow", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          cartId: cart?.id,
          amount: cart?.total ?? 0,
          order_id: order.id,
          token: verifiedCard.token,
        }),
      })
        .then((res) => res.json())
        .catch((_) => undefined)

      if (order.id) {
        replace(`/order/confirmed/${order.id}`)
        return
      }
    } else {
      const MyUserpay = window.MyUserPay
      console.log({ cardElementId })

      MyUserpay.createElementToken(cardElementId, async (data: any) => {
        console.log({ data })
        if (data.status) {
          const { data: order } = await completeCart()
          const token = data.token

          await fetch("/api/paynow", {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify({
              amount: cart?.total ?? 0,
              order_id: order.id,
              token,
            }),
          })

          if (order.id) {
            replace(`/order/confirmed/${order.id}`)
            return
          }
        } else {
          setErrorMessage(data.error.message)
          setSubmitting(false)
        }
      })
    }

    // setSubmitting(false)
  }

  return (
    <div className="col-md-6 mb-2">
      <div className="text-end pt-2 pb-2">
        <button
          onClick={handleCheckout}
          disabled={submitting}
          className="btn btn-default btn-lg w-100 w-md-auto flex justify-center"
        >
          {submitting ? <Spinner size={24} /> : "Pay Now"}
        </button>
        {errorMessage && (
          <div className="text-red-500 text-small-regular mt-2">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  )
}
