import { CheckoutProvider, useCheckout } from "@lib/context/checkout-context"

import CheckoutLoader from "../components/checkout-loader"
import CheckoutForm from "./checkout-form"
import CheckoutSummary from "./checkout-summary"
import { useStore } from "@lib/context/store-context"

import { useEffect } from "react"
import { useCart } from "medusa-react"

const CheckoutTemplate = () => {
  const { resetCart } = useStore()
  const { cart } = useCart()

  useEffect(() => {
    return () => {
      // if (isQuickCheckout) {
      resetCart()
      // }
    }
  }, [])

  return !cart ? null : (
    <CheckoutProvider>
      <main>
        <section className="p-0 half-bg-light checkout-sec">
          <div className="container-fluid">
            <CheckoutLoader />
            <div className="row">
              <div className="col-sm-12 col-lg-7">
                <CheckoutForm />
              </div>
              <div className="col-sm-12 col-lg-5 d-none d-md-block bg-light">
                <CheckoutSummary />
              </div>
            </div>
          </div>
        </section>
      </main>
    </CheckoutProvider>
  )
}

export default CheckoutTemplate
