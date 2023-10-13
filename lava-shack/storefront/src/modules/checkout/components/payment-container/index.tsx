import { PaymentSession } from "@medusajs/medusa"
import Radio from "@modules/common/components/radio"
import clsx from "clsx"
import React from "react"
import PaymentStripe from "../payment-stripe"
import PaymentTest from "../payment-test"
import PaymentMyUser from "../payment-myuser"
import Image from "next/image"
import PaymentSquare from "../payment-square"

type PaymentContainerProps = {
  paymentSession: PaymentSession
  selected: boolean
  setSelected: () => void
  disabled?: boolean
  setDone: (val: boolean) => void
}

const PaymentInfoMap: Record<string, { title: string; description: string }> = {
  stripe: {
    title: "Credit card",
    description: "Secure payment with credit card",
  },
  "stripe-ideal": {
    title: "iDEAL",
    description: "Secure payment with iDEAL",
  },
  paypal: {
    title: "PayPal",
    description: "Secure payment with PayPal",
  },
  manual: {
    title: "Test payment",
    description: "Test payment using medusa-payment-manual",
  },
  mpay: {
    title: "Credit/Debit card",
    description: "",
  },
  "square-payment-provider": {
    title: "Credit/Debit card",
    description: "Secure payment with credit card",
  },
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentSession,
  selected,
  setSelected,
  disabled = false,
  setDone,
}) => {
  return (
    <div
      className={clsx("pay-item", {
        ["active"]: selected,
      })}
    >
      <div
        className="pay_label w-full inline-flex items-center relative"
        onClick={setSelected}
      >
        <span className="absolute w-10 top-4 left-4">
          <Radio checked={selected} />
        </span>

        <label className="flex-1 d-flex align-items-center justify-content-between flex-wrap">
          <div className="flex flex-col text-left">
            <h3 className="text-base-semi leading-none text-gray-900">
              {PaymentInfoMap[paymentSession.provider_id].title}
            </h3>
            <span className="text-gray-700 text-small-regular">
              {PaymentInfoMap[paymentSession.provider_id].description}
            </span>
          </div>

          <div className="payment-icon text-md-end inline-flex items-center gap-x-1 ">
            <Image
              src="/assets/images/american_express.svg"
              alt="samerican_express"
              height={22}
              width={35}
            />
            <Image
              src="/assets/images/diners_club.svg"
              alt="diners_club"
              height={22}
              width={35}
            />
            <Image
              src="/assets/images/discover.svg"
              alt="discover"
              height={22}
              width={35}
            />
            <Image
              src="/assets/images/jcb.svg"
              alt="jcb"
              height={22}
              width={35}
            />
            <Image
              src="/assets/images/master.svg"
              alt="master"
              height={22}
              width={35}
            />
            <Image
              src="/assets/images/visa.svg"
              alt="visa"
              height={22}
              width={35}
            />
          </div>
        </label>
      </div>

      {selected && (
        <div className="pay-content p-3">
          <PaymentElement paymentSession={paymentSession} setDone={setDone} />
        </div>
      )}
    </div>
  )
}

const PaymentElement = ({
  paymentSession,
  setDone,
}: {
  paymentSession: PaymentSession
  setDone: (val: boolean) => void
}) => {
  switch (paymentSession.provider_id) {
    case "stripe":
      return (
        <div className="pt-8 pr-7">
          <PaymentStripe />
        </div>
      )
    case "mpay":
      return (
        <>
          <PaymentMyUser setDone={setDone} />
        </>
      )
    case "square-payment-provider":
      return <PaymentSquare />
    case "manual":
      // We only display the test payment form if we are in a development environment
      return process.env.NODE_ENV === "development" ? <PaymentTest /> : null
    default:
      return null
  }
}

export default PaymentContainer
