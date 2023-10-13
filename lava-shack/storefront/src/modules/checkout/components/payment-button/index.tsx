import { useCheckout } from "@lib/context/checkout-context"
import { PaymentSession } from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import Spinner from "@modules/common/icons/spinner"
import { OnApproveActions, OnApproveData } from "@paypal/paypal-js"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { v4 } from "uuid"
import { useCart } from "medusa-react"
import { useRouter } from "next/router"

import React, { useCallback, useEffect, useState } from "react"
import { trackEvent } from "@lib/pixel"

type PaymentButtonProps = {
  paymentSession?: PaymentSession | null
  done?: boolean
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  paymentSession,
  done = true,
}) => {
  const [notReady, setNotReady] = useState(true)
  const { cart } = useCart()

  useEffect(() => {
    setNotReady(true)
    // console.log({ cart })

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

    // if ((cart?.total ?? 0) > 0 && cart.payment_session) {
    //   return
    // }

    if (cart.shipping_methods.length < 1) {
      return
    }

    setNotReady(false)
  }, [cart])

  if ((cart?.total ?? 0) > 0) {
    switch (paymentSession?.provider_id) {
      case "stripe":
        return (
          <StripePaymentButton session={paymentSession} notReady={notReady} />
        )
      case "manual":
        return <ManualTestPaymentButton notReady={notReady} />
      case "paypal":
        return (
          <PayPalPaymentButton notReady={notReady} session={paymentSession} />
        )
      case "MyUserPay":
        return (
          <MyUserPaymentButton notReady={notReady} session={paymentSession} />
        )
      case "square-payment-provider":
        return (
          <SquarePaymentButton notReady={notReady} session={paymentSession} />
        )
      default:
        return (
          <button
            className="btn btn-default btn-lg w-100 w-md-auto flex justify-center"
            disabled
          >
            Select a payment method
          </button>
        )
    }
  }

  return <ManualTestPaymentButton notReady={notReady} />
}

const StripePaymentButton = ({
  session,
  notReady,
}: {
  session: PaymentSession
  notReady: boolean
}) => {
  const [disabled, setDisabled] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  // const { cart } = useCart()
  const {
    onPaymentCompleted,
    handleSubmit,
    setAddresses,
    cart,
    sameAsBilling,
    getValues,
  } = useCheckout()

  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("cardNumber")

  useEffect(() => {
    if (!stripe || !elements) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [stripe, elements])

  const processPayment = useCallback(async () => {
    console.log({ cart, stripe, card })
    if (!stripe || !cart || !card) {
      setSubmitting(false)
      return
    }

    const values = getValues()
    // console.log({ values, state: sameAsBilling.state })

    const billing_address = sameAsBilling.state
      ? values.shipping_address
      : values.billing_address

    if (!billing_address) {
      setSubmitting(false)
      return
    }

    // console.log({ billing_address, card })
    console.log({ session })

    await stripe
      .confirmCardPayment(session.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name: billing_address.first_name + " " + billing_address.last_name,
            address: {
              city: billing_address.city ?? undefined,
              country: billing_address.country_code ?? undefined,
              line1: billing_address.address_1 ?? undefined,
              line2: billing_address.address_2 ?? undefined,
              postal_code: billing_address.postal_code ?? undefined,
              state: billing_address.province ?? undefined,
            },
            email: cart.email,
            phone: billing_address.phone ?? undefined,
          },
          metadata: {
            type2: "client_confirm",
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        console.log({ paymentIntent })
        if (error) {
          const pi = error.payment_intent

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted()
          }

          setErrorMessage(error.message)
          return
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return onPaymentCompleted()
        }

        return
      })
      .finally(() => {
        setSubmitting(false)
      })
  }, [cart, stripe, card])

  const handlePayment = async () => {
    setSubmitting(true)

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false)
      return
    }

    await handleSubmit(setAddresses)()

    await processPayment()
  }

  return (
    <div className="col-md-6 mb-2">
      <div className="text-end pt-2 pb-2">
        <button
          disabled={submitting || disabled || notReady}
          onClick={handlePayment}
          className="btn btn-default btn-lg w-100 w-md-auto flex justify-center"
        >
          {submitting ? <Spinner /> : "Pay Now"}
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

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ""

const PayPalPaymentButton = ({
  session,
  notReady,
}: {
  session: PaymentSession
  notReady: boolean
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const { cart } = useCart()
  const { onPaymentCompleted } = useCheckout()

  const handlePayment = async (
    _data: OnApproveData,
    actions: OnApproveActions
  ) => {
    actions?.order
      ?.authorize()
      .then((authorization) => {
        if (authorization.status !== "COMPLETED") {
          setErrorMessage(`An error occurred, status: ${authorization.status}`)
          return
        }
        onPaymentCompleted()
      })
      .catch(() => {
        setErrorMessage(`An unknown error occurred, please try again.`)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }
  return (
    <PayPalScriptProvider
      options={{
        "client-id": PAYPAL_CLIENT_ID,
        currency: cart?.region.currency_code.toUpperCase(),
        intent: "authorize",
      }}
    >
      {errorMessage && (
        <span className="text-rose-500 mt-4">{errorMessage}</span>
      )}
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={async () => session.data.id as string}
        onApprove={handlePayment}
        disabled={notReady || submitting}
      />
    </PayPalScriptProvider>
  )
}

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false)

  const { onPaymentCompleted, handleSubmit, setAddresses } = useCheckout()

  const handlePayment = async () => {
    setSubmitting(true)
    await handleSubmit(setAddresses)()

    onPaymentCompleted()

    setSubmitting(false)
  }

  return (
    <button
      className="btn btn-default btn-lg w-100 w-md-auto flex justify-center"
      disabled={submitting || notReady}
      onClick={handlePayment}
    >
      {submitting ? <Spinner /> : "Pay Now"}
    </button>
  )
}

const MyUserPaymentButton = ({
  notReady,
  session,
}: {
  notReady: boolean
  session: PaymentSession
}) => {
  const [submitting, setSubmitting] = useState(false)

  const { onPaymentCompleted, cart } = useCheckout()

  const { replace } = useRouter()

  const handlePayment = async () => {
    setSubmitting(true)

    let token = window.sessionStorage.getItem("c_myuser_token")

    const res = await fetch("/api/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        amount: cart?.total ?? 0,
        token,
        cartId: cart?.id,
      }),
    })
      .then((res) => res.json())
      .catch((_) => undefined)

    console.log({ res })

    if (!res.id) {
      console.error(res)
      setSubmitting(false)
      return
    }

    window.sessionStorage.removeItem("c_myuser_token")

    replace(`/order/confirmed/${res.id}`)
    // setSubmitting(false)
  }

  return (
    <>
      <Button
        onClick={handlePayment}
        variant="secondary"
        disabled={notReady || submitting}
      >
        {submitting ? <Spinner /> : "Buy"}
      </Button>
    </>
  )
}

const SquarePaymentButton = ({
  session,
  notReady,
}: {
  session: PaymentSession
  notReady: boolean
}) => {
  const [submitting, setSubmitting] = useState(false)

  const {
    square,
    onPaymentCompleted,
    paymentMethod,
    handleSubmit,
    setAddresses,
  } = useCheckout()
  const {
    completeCheckout: { mutateAsync: complete },
  } = useCart()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const createPayment = async (
    token: string,
    locationId: string,
    cart_id: string,
    amount: number
  ) => {
    const body = JSON.stringify({
      locationId,
      sourceId: token,
      idempotencyKey: v4(),
      cart_id,
      amount,
    })
    const paymentResponse = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
    if (paymentResponse.ok) {
      return paymentResponse.json()
    }
    const errorBody = await paymentResponse.text()
    throw new Error(errorBody)
  }

  const tokenize = async (paymentMethod: any) => {
    const tokenResult = await paymentMethod.tokenize()
    if (tokenResult.status === "OK") {
      return tokenResult.token
    } else {
      let errorMessage = `Tokenization failed-status: ${tokenResult.status}`
      if (tokenResult.errors) {
        errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`
      }
      throw new Error(errorMessage)
    }
  }

  const { replace } = useRouter()
  const onClick = async () => {
    if (!window.Square || !paymentMethod) return

    setSubmitting(true)

    await handleSubmit(setAddresses)()

    try {
      const token = await tokenize(paymentMethod)

      const { data: order } = await complete()

      const paymentResults = await createPayment(
        token,
        square?.locationId ?? "",
        session.cart_id ?? "",
        (order as any)?.total ?? 0
      )

      console.log({ paymentResults })

      if (order && order.id) {
        replace(`/order/confirmed/${order.id}`)
      }
    } catch (err: any) {
      console.error(err.message)
      setErrorMessage(err.message)
    }

    setSubmitting(false)
  }

  return (
    <div className="col-md-6 mb-2">
      <div className="text-end pt-2 pb-2">
        <button
          disabled={submitting || notReady}
          onClick={onClick}
          className="btn btn-default btn-lg w-100 w-md-auto flex justify-center"
        >
          {submitting ? <Spinner /> : "Pay Now"}
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

export default PaymentButton
