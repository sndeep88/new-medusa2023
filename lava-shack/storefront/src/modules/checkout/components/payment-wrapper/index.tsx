import { PaymentSession } from "@medusajs/medusa"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import React from "react"

type WrapperProps = {
  paymentSession?: PaymentSession | null
  stripeKey?: string | null
}

const Wrapper: React.FC<WrapperProps> = ({
  paymentSession,
  children,
  stripeKey,
}) => {
  if (!paymentSession) {
    return <div>{children}</div>
  }

  switch (paymentSession.provider_id) {
    case "stripe":
      return (
        <StripeWrapper paymentSession={paymentSession} stripeKey={stripeKey}>
          {children}
        </StripeWrapper>
      )

    default:
      return <>{children}</>
  }
}

// const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY || ""

const StripeWrapper: React.FC<WrapperProps> = ({
  paymentSession,
  children,
  stripeKey,
}) => {
  const stripePromise = loadStripe(stripeKey ?? "")

  const options: StripeElementsOptions = {
    clientSecret: paymentSession!.data.client_secret as string | undefined,
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  )
}

export default Wrapper
