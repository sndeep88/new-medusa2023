import { Cart } from "@medusajs/medusa"
import Spinner from "@modules/common/icons/spinner"
import PaymentContainer from "../payment-container"
import { useCheckout } from "@lib/context/checkout-context"
import Radio from "@modules/common/components/radio"
import BillingAddress from "../billing_address"
import PaymentButton from "../payment-button"
import { formatAmount } from "medusa-react"
import { RadioGroup } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import clsx from "clsx"
import CheckoutButton from "../checkout-button"

const CheckoutPayment = ({
  cart,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}) => {
  const {
    setPaymentSession,
    initPayment,
    sameAsBilling: { state: checked, toggle: onChange },
    showPaymentSelect,
  } = useCheckout()

  const [billing, setBilling] = useState(1)

  const [done, setDone] = useState(false)

  useEffect(() => {
    // console.log({ cart })
    if (cart && (cart.total ?? 0) > 0) {
      initPayment()
    }
    // console.log({ cart })
    if (
      cart?.payment_sessions.length &&
      !cart.payment_session &&
      !!cart.payment_sessions.find((s) => s.provider_id === "mpay")
    ) {
      setPaymentSession("mpay")
    }
  }, [cart])

  return (
    <div className="step_3">
      <div className="shipping pb-2">
        <h5 className="mb-0">Payment</h5>
        <p className="m-0">All transactions are secure and encrypted.</p>
      </div>

      {showPaymentSelect.error && (
        <div className="alert alert-danger mt-3 mb-0">
          {showPaymentSelect.error}
        </div>
      )}

      {showPaymentSelect.show && (
        <div className="pay_option mb-4">
          {cart?.payment_sessions.length ? (
            cart.payment_sessions
              .sort((a, b) => {
                return a.provider_id > b.provider_id ? 1 : -1
              })
              .map((paymentSession) => {
                return (
                  <PaymentContainer
                    paymentSession={paymentSession}
                    key={paymentSession.id}
                    selected={
                      cart?.payment_session?.provider_id ===
                      paymentSession.provider_id
                    }
                    setSelected={() => {
                      // console.log({ prodider_id: paymentSession.provider_id })
                      setPaymentSession(paymentSession.provider_id)
                    }}
                    setDone={setDone}
                  />
                )
              })
          ) : (cart.total ?? 0) > 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-gray-900">
              <Spinner />
            </div>
          ) : (
            <></>
          )}
        </div>
      )}

      <div className="billing pay_option pt-3 mb-4">
        <h5 className="mb-0">Billing Address</h5>
        <p className="mt-0">
          Select the address that matches your card or payment method.
        </p>

        <>
          {/* same as shipping */}
          <RadioGroup
            value={billing}
            onChange={(c) => {
              setBilling(c)
              if (!!c != checked) {
                onChange()
              }
            }}
          >
            <RadioGroup.Option
              value={1}
              className={({ checked }) =>
                clsx("pay-item", {
                  active: checked,
                })
              }
            >
              {({ checked }) => (
                <div className="pay_label relative">
                  <span className="absolute w-10 top-1/2 left-4 -translate-y-1/2">
                    <Radio checked={checked} />
                  </span>
                  <RadioGroup.Label className="ml-2">
                    Same as shipping address
                  </RadioGroup.Label>
                </div>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option
              value={0}
              className={({ checked }) => clsx("pay-item", { active: checked })}
            >
              {({ checked }) => (
                <>
                  <div className="pay_label relative">
                    <span className="absolute w-10 top-1/2 left-4 -translate-y-1/2">
                      <Radio checked={checked} />
                    </span>
                    <RadioGroup.Label className="ml-2 text-gray-900">
                      Use a different billing address
                    </RadioGroup.Label>
                  </div>
                  {checked && (
                    <div className="pay-content p-3">
                      <BillingAddress />
                    </div>
                  )}
                </>
              )}
            </RadioGroup.Option>
          </RadioGroup>
        </>
      </div>

      {cart.id && (
        <div className="row pt-3 pt-md-4 pb-0 pb-md-4  align-items-center flex-column-reverse flex-md-row ">
          <div className="invisible col-md-6 mb-2 text-center text-md-start">
            <div className="pt-2 pb-2">
              <a className="return-link" href="#">
                Return to cart
              </a>
            </div>
          </div>
          {/* <PaymentButton paymentSession={cart.payment_session} /> */}
          <CheckoutButton />
        </div>
      )}
    </div>
  )
}
export default CheckoutPayment
