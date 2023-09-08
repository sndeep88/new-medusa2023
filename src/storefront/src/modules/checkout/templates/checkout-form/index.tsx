import CheckoutInfo from "@modules/checkout/components/checkout-info"
import CheckoutPayment from "@modules/checkout/components/checkout-payment"
import CheckoutShipping from "@modules/checkout/components/checkout-shipping"

import Cart2 from "@modules/common/icons/cart_2"
import ChevronDown from "@modules/common/icons/chevron-down"
import Clock from "@modules/common/icons/clock"

import { formatAmount, useCart } from "medusa-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import CheckoutSummary from "../checkout-summary"
import clsx from "clsx"
import { useCheckout } from "@lib/context/checkout-context"

const steps = [
  { name: "Information", href: "#" },
  { name: "Shipping", href: "#" },
  { name: "Payment", href: "#" },
]

const CheckoutForm = () => {
  const { cart, getValues } = useCheckout()

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

  useEffect(() => {
    let timeout = setTimeout(() => {
      console.log("fire after 5 minutes")
      createDraftOrder()
    }, 1000 * 60 * 5) // 5 minutes
    // }, 1000 * 10) // 30 seconds for test only

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  async function createDraftOrder() {
    const email = getValues().email
    if (!cart || !email || email === "") return

    const data = {
      email,
      cartId: cart.id,
    }

    await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }

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
    return Math.floor(ms).toString().padStart(2, "0")
  }, [time])

  const [showSummary, setShowSummary] = useState(false)
  const toggleSummary = () => {
    console.log("toggleSummary")
    setShowSummary(!showSummary)
  }

  if (!cart?.id) {
    return null
  }

  return (
    <div className="left-box-pd">
      <div className="pb-3">
        <Link href="/">
          <a className="navbar-brand">
            <strong>Shopping Center</strong>
          </a>
        </Link>
      </div>

      <div className="visitor-box expHide">
        <Clock className="mr-2" />
        <span className="visitor-info">
          Your order is reserved for the next{" "}
        </span>
        <div className="countdown m-0 timeout_isolate bg-transparent ">
          <div className="checkoutCounter countdown-time">
            <ul className="clearfix">
              <li className="item">{minute}</li>
              <li className="blank">:</li>
              <li className="item">
                {second}.{milisecond}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button onClick={createDraftOrder}>test draft order</button>

      <div className="accordion d-block d-md-none">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              onClick={toggleSummary}
            >
              <span className="w-100 inline-flex">
                <Cart2 className="me-2 directional" strokeWidth={0.5} />
                Show order summary
                <ChevronDown
                  className={clsx("ms-1 transition duration-300", {
                    ["-rotate-180"]: showSummary,
                  })}
                />
              </span>
              <strong className="float-end">
                {formatAmount({
                  amount: cart.total || 0,
                  region: cart.region,
                  includeTaxes: false,
                })}
              </strong>
            </button>
          </h2>
          <div
            id="collapseOne"
            className={clsx("accordion-collapse", {
              ["collapse"]: !showSummary,
            })}
            aria-labelledby="headingOne"
          >
            <div className="accordion-body">
              <CheckoutSummary />
            </div>
          </div>
        </div>
      </div>

      <div className="step_1">
        <CheckoutInfo />
      </div>

      <div className="step_2">
        <CheckoutShipping cart={cart} />

        <CheckoutPayment cart={cart} />
      </div>

      <div className="checkout-footer mt-0 mt-md-4">
        <p className="mb-2">
          All charges will appear on your credit card statement as‘saidquietly
          *uk’
        </p>
        <div className="payment-icon inline-flex gap-x-2">
          <Image
            src="/assets/images/american_express.svg"
            alt="american_express"
            height={22}
            width={35}
            className="m-[4px]"
          />
          <Image
            src="/assets/images/diners_club.svg"
            alt="diners_club"
            height={22}
            width={35}
            className="m-[4px]"
          />
          <Image
            src="/assets/images/discover.svg"
            alt="discover"
            height={22}
            width={35}
            className="m-[4px]"
          />
          <Image
            src="/assets/images/jcb.svg"
            alt="jcb"
            height={22}
            width={35}
            className="m-[4px]"
          />
          <Image
            src="/assets/images/master.svg"
            alt="master"
            height={22}
            width={35}
            className="m-[4px]"
          />
          <Image
            src="/assets/images/visa.svg"
            alt="visa"
            height={22}
            width={35}
            className="m-[4px]"
          />
        </div>
        <hr />
        <div>
          <small>© 2023 Shopping Center. All Rights Reserved.</small>
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm
