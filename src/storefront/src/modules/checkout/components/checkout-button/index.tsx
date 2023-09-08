import { CardInfomation, useCheckout } from "@lib/context/checkout-context"
import Button from "@modules/common/components/button"
import Spinner from "@modules/common/icons/spinner"
import { useCart } from "medusa-react"
import { useRouter } from "next/router"

import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

export default function CheckoutButton() {
  const [notReady, setNotReady] = useState(true)
  const { cart, addShippingMethod } = useCart()

  const { getValues, formState } = useFormContext<CardInfomation>()

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

    setNotReady(false)
  }, [cart, isDirty, isValid])

  const [submitting, setSubmitting] = useState(false)
  const { handleSubmit, setAddresses, cardElementId } = useCheckout()

  const { replace } = useRouter()

  const saveCard = async (data: any, amount: number) => {
    var res = await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        ...data,
        amount,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err)
        // setError(err)
        return undefined
      })

    // console.log({ res })

    return res
  }
  const chargeCard = async (data: any, amount: number) => {
    var res = await fetch("/api/charge", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        ...data,
        amount,
        cartId: cart?.id,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err)
        // setError(err)
        return undefined
      })

    // console.log({ res })

    return res
  }

  const handleCheckout = async (ev: React.MouseEvent) => {
    // console.log({ cart })
    setSubmitting(true)

    handleSubmit(setAddresses)(ev)
    // console.log({ cart })

    const MyUserPay = window.MyUserPay

    // MyUserPay.createRiskSession(
    //   function (data: any) {
    //     console.log({ data })
    //     if (data.status === 1) {
    //       setRiskSessionId(data.id)
    //     }
    //     setSubmitting(false)
    //   },
    //   { connection_token: "default" }
    // )

    const cardInfo = getValues()

    let order = await fetch("/api/paynow", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        cartId: cart?.id,
        card: {
          ...cardInfo,
        },
        amount: cart?.total ?? 0,
      }),
    })
      .then((res) => res.json())
      .catch((_) => undefined)

    // console.log({ order })

    if (order.id) {
      replace(`/order/confirmed/${order.id}`)
      return
    }

    setSubmitting(false)

    // MyUserPay.createElementToken(cardElementId, async function (data: any) {
    //   if (data.status) {
    //     var saved = await saveCard(data, cart?.total ?? 0)

    //     if (!saved.status) {
    //       setSubmitting(false)
    //       return
    //     }

    //     var order = await chargeCard({ token: saved.src_id }, cart?.total ?? 0)

    //     console.log({ order })

    //     if (order.id) {
    //       replace(`/order/confirmed/${order.id}`)
    //       return
    //     }

    //     setSubmitting(false)
    //   }
    // })

    // setSubmitting(false)
  }

  return (
    <div className="col-md-6 mb-2">
      <div className="text-end pt-2 pb-2">
        <button
          onClick={handleCheckout}
          disabled={notReady || submitting}
          className="btn btn-default btn-lg w-100 w-md-auto flex justify-center"
        >
          {submitting ? <Spinner size={24} /> : "Pay Now"}
        </button>
      </div>
    </div>
  )
}
