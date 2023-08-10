import { Cart } from "@medusajs/medusa"
import Spinner from "@modules/common/icons/spinner"
import { useStepUIContext } from "../step-wrapper"
import Button from "@modules/common/components/button"
import PaymentContainer from "../payment-container"
import { useCheckout } from "@lib/context/checkout-context"
import Radio from "@modules/common/components/radio"
import BillingAddress from "../billing_address"
import PaymentButton from "../payment-button"
import { formatAmount } from "medusa-react"
import { RadioGroup } from "@headlessui/react"
import { useEffect, useState } from "react"

const CheckoutPayment = ({
  cart,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}) => {
  const { onBack, onNext } = useStepUIContext()
  const {
    setPaymentSession,
    initPayment,
    sameAsBilling: { state: checked, toggle: onChange },
  } = useCheckout()

  const [billing, setBilling] = useState(1)

  const [done, setDone] = useState(false)

  useEffect(() => {
    console.log({ cart })
    if (cart?.payment_sessions.length && !cart.payment_session) {
      setPaymentSession(cart.payment_sessions[0].provider_id)
    }
  }, [cart])

  return (
    <div>
      <div className="border border-gray-300 rounded-md px-4 divide-y divide-gray-300">
        <div className="py-3">
          <div className="w-full relative">
            <div className="span text-blue-500 underline hover:cursor-pointer absolute top-0 right-0">
              Change
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-y-3">
              <h4 className="w-full md:w-2/12">Contact</h4>
              <p className="flex-1">{cart?.email}</p>
            </div>
          </div>
        </div>

        <div className="py-3">
          {cart && cart.shipping_address ? (
            <div className="w-full relative">
              <div className="span text-blue-500 underline hover:cursor-pointer absolute top-0 right-0">
                Change
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-y-3 ">
                <h4 className="w-full md:w-2/12">Ship to</h4>
                <p className="flex-1 max-w-full text-wrap">
                  {cart.shipping_address.address_1},{" "}
                  {cart.shipping_address.city},{" "}
                  {cart.shipping_address.country_code?.toUpperCase()}
                </p>
                <div className="hidden md:block md:w-16"></div>
              </div>
            </div>
          ) : (
            <div className="">
              <Spinner />
            </div>
          )}
        </div>

        <div className="py-3">
          <div className="w-full relative">
            <div className="span text-blue-500 underline hover:cursor-pointer absolute top-0 right-0">
              Change
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-y-3">
              <h4 className="w-full md:w-2/12">Method</h4>
              {cart?.shipping_methods.map((method, idx) => (
                <p className="flex-1" key={idx}>
                  {method.shipping_option.name} -{" "}
                  {formatAmount({
                    amount: method.shipping_option.amount ?? 0,
                    region: cart.region ?? "EU",
                  })}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="my-5">
        <h4 className="text-xl font-extrabold text-gray-900">Payment</h4>
        <span className="text-gray-700 text-sm">
          All transactions are secure and encrypted.
        </span>

        <div className="flex flex-col gap-y-4 mt-3">
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
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-gray-900">
              <Spinner />
            </div>
          )}
        </div>
      </div>

      <div className="py-5">
        <h4 className="text-xl font-extrabold text-gray-900">Billing Address</h4>
        <span className="text-sm text-gray-700">
          Select the address that matches your card or payment method.
        </span>

        <div className="mt-4">
          {/* same as shipping */}
          <RadioGroup
            value={billing}
            onChange={(c) => {
              setBilling(c)
              if (!!c != checked) {
                onChange()
              }
            }}
            className="flex flex-col gap-y-4"
          >
            <RadioGroup.Option
              value={1}
              className="flex items-center border rounded bg-blue-100 px-3 py-3 w-full"
            >
              {({ checked }) => (
                <>
                  <Radio checked={checked} />
                  <RadioGroup.Label className="ml-2">
                    Identical with the delivery address
                  </RadioGroup.Label>
                </>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option
              value={0}
              className="flex items-center border rounded bg-blue-100 px-3 py-3 w-full"
            >
              {({ checked }) => (
                <>
                  <Radio checked={checked} />
                  <RadioGroup.Label className="ml-2">
                    Use a different billing address
                  </RadioGroup.Label>
                </>
              )}
            </RadioGroup.Option>
          </RadioGroup>
          {/* <button
            className="flex items-center border rounded bg-blue-100 px-3 py-3 w-full"
            onChange={onChange}
          >
            <Radio checked={checked} />
            <div className="ml-2">
              <span>Identical with the delivery address</span>
            </div>
          </button>
          <div className="border border-gray-200 rounded w-full">
            <button
              className="flex items-center w-full bg-blue-100 p-3"
              onClick={onChange}
            >
              <Radio checked={!checked} />
              <div className="ml-2">
                <span>Use a different billing address</span>
              </div>
            </button>
          </div> */}
          {!checked && (
            <div className="mt-3">
              <BillingAddress />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span
          onClick={onBack}
          className="return-link text-blue-500 hover:cursor-pointer"
        >
          Return to shipping
        </span>

        <PaymentButton paymentSession={cart.payment_session} done={done} />
      </div>
    </div>
  )
}
export default CheckoutPayment
