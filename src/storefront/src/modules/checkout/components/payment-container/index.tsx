import { PaymentSession } from "@medusajs/medusa"
import Radio from "@modules/common/components/radio"
import clsx from "clsx"
import React from "react"
import PaymentStripe from "../payment-stripe"
import PaymentTest from "../payment-test"
import PaymentMyUser from "../payment-myuser"
import Image from "next/image"

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
  MyUserPay: {
    title: "Credit/Debit card",
    description: "My User payment",
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
      className={clsx(
        "flex flex-col gap-y-4 border border-gray-200 rounded-md ",
        {
          "bg-gray-50": selected,
        }
      )}
    >
      <button
        className={clsx("gap-x-4 divide-y divide-gray-300", {
          // "bg-blue-100": selected,
        })}
        onClick={setSelected}
        disabled={disabled}
      >
        <div className="w-full flex items-center text-left p-3">
          <h3 className="leading-none text-gray-900">
            {PaymentInfoMap[paymentSession.provider_id].title}
          </h3>

          <div className="ml-auto flex items-center gap-x-2">
            <Image
              src="/assets/images/visa.svg"
              alt="visa"
              width={40}
              height={30}
            />
            <Image
              src="/assets/images/master.svg"
              alt="master"
              width={40}
              height={30}
            />
            <Image
              src="/assets/images/american_express.svg"
              alt="samerican_express"
              width={40}
              height={30}
            />
            <Image
              src="/assets/images/discover.svg"
              alt="discover"
              width={40}
              height={30}
            />
            <span className="text-sm text-gray-500">and more...</span>
          </div>
        </div>
        {selected && (
          <div
            className={clsx("w-full bg-slate-200 py-3 px-4", {
              ["hidden "]: !selected,
            })}
            onClick={(e) => e.stopPropagation()}
          >
            <PaymentElement paymentSession={paymentSession} setDone={setDone} />
          </div>
        )}
      </button>
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
    case "MyUserPay":
      return (
        <div className="">
          <PaymentMyUser setDone={setDone} />
        </div>
      )
    case "manual":
      // We only display the test payment form if we are in a development environment
      return process.env.NODE_ENV === "development" ? <PaymentTest /> : null
    default:
      return null
  }
}

export default PaymentContainer
