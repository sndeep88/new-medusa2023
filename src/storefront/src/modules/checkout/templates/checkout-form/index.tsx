import Breadcrumb from "@modules/checkout/components/breadcrumb"
import CheckoutInfo from "@modules/checkout/components/checkout-info"
import CheckoutPayment from "@modules/checkout/components/checkout-payment"
import CheckoutShipping from "@modules/checkout/components/checkout-shipping"
import Clock from "@modules/common/icons/clock"

import { useCart } from "medusa-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

const steps = [
  { name: "Information", href: "#" },
  { name: "Shipping", href: "#" },
  { name: "Payment", href: "#" },
]

const CheckoutForm = () => {
  const { cart } = useCart()

  const endTime = new Date()

  const [time, setTime] = useState(
    (() => {
      return endTime.setMinutes(endTime.getMinutes() + 5)
    })()
  ) // 5 mins in miliseconds

  const count = () => {
    var now = new Date()

    var distance = endTime.getTime() - now.getTime()
    if (distance <= 0) {
      setTime(0)
      return
    }
    setTime(distance)
  }

  useEffect(() => {
    let i = setInterval(count, 100)

    return () => {
      clearInterval(i)
    }
  }, [])

  const minute = useMemo(
    () =>
      Math.floor((time / 1000 / 60) % 60)
        .toString()
        .padStart(2, "0"),
    [time]
  )
  const second = useMemo(
    () =>
      Math.floor((time / 1000) % 60)
        .toString()
        .padStart(2, "0"),
    [time]
  )

  const milisecond = useMemo(() => {
    const ms = time % 10
    return Math.floor(ms)
  }, [time])

  if (!cart?.id) {
    return null
  }

  return (
    <div className="w-full bg-white px-3 sm:px-5 md:px-10 ">
      <Link href="/">
        <a className="navbar-brand">
          Shopping
          <br /> Center
        </a>
      </Link>
      <div className="mt-3">
        <div className="w-full flex items-center py-2 px-3 text-sm font-bold bg-orange-100 rounded">
          <Clock className="mr-2" />
          Your order is reserved for the next{" "}
          <span className="px-2 bg-orange-300 rounded mx-2">
            {minute}
          </span> :{" "}
          <span className="px-2 bg-orange-300 rounded mx-2">
            {second}.{milisecond}
          </span>
        </div>
      </div>
      <div className="mt-3">
        <Breadcrumb pages={steps} />
      </div>

      <div className="mt-4 flex flex-col gap-y-4">
        <CheckoutInfo />

        <CheckoutShipping cart={cart} />

        <CheckoutPayment cart={cart} />
      </div>
    </div>
  )
}

export default CheckoutForm
