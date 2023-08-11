import { useCheckout } from "@lib/context/checkout-context"
import Button from "@modules/common/components/button"
import Spinner from "@modules/common/icons/spinner"
import { useCart } from "medusa-react"
import { useRouter } from "next/router"

import { useEffect, useState } from "react"

export default function CheckoutButton() {
  const [notReady, setNotReady] = useState(true)
  const { cart, addShippingMethod } = useCart()

  useEffect(() => {
    setNotReady(true)

    if (!cart) {
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

    console.log({ cart })

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
  }, [cart])

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

    console.log({ res })

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

    console.log({ res })

    return res
  }

  const handleCheckout = (ev: React.MouseEvent) => {
    console.log({ cart })
    setSubmitting(true)

    handleSubmit(setAddresses)(ev)
    console.log({ cart })

    const MyUserPay = window.MyUserPay

    MyUserPay.createElementToken(cardElementId, async function (data: any) {
      if (data.status) {
        var saved = await saveCard(data, cart?.total ?? 0)

        if (!saved.status) {
          setSubmitting(false)
          return
        }

        var order = await chargeCard({ token: saved.src_id }, cart?.total ?? 0)

        console.log({ order })

        if (order.id) {
          replace(`/order/confirmed/${order.id}`)
          return
        }

        setSubmitting(false)
      }
    })

    // setSubmitting(false)
  }

  return (
    <>
      <Button
        onClick={handleCheckout}
        variant="secondary"
        disabled={notReady || submitting}
        className="!bg-[#276EAF]"
      >
        {submitting ? <Spinner /> : "Pay now"}
      </Button>
    </>
  )
}
