import { CheckoutProvider, useCheckout } from "@lib/context/checkout-context"

import CheckoutLoader from "../components/checkout-loader"
import CheckoutForm from "./checkout-form"
import CheckoutSummary from "./checkout-summary"
import { useStore } from "@lib/context/store-context"

import { useEffect, useRef } from "react"
import { useCart } from "medusa-react"
import { trackEvent } from "@lib/pixel"
import { IS_BROWSER } from "@lib/constants"

const CheckoutTemplate = ({
  apiKey,
  stripe,
  storeData,
  square,
  mpay,
}: {
  apiKey?: string
  stripe: any
  storeData: any
  square: any
  mpay?: any
}) => {
  const { resetCart } = useStore()
  const { cart } = useCart()
  const first = useRef(true)

  useEffect(() => {
    trackEvent("AddToCart", {
      content_ids: cart?.items.map((line) => line.variant_id),
      contents: cart?.items.map((item) => ({
        content_id: item.variant_id,
        content_name: item.variant.title,
        quantity: item.quantity,
        price: item.unit_price,
      })),
      content_type: "product",
      currency: cart?.region?.currency_code.toUpperCase(),
      value: cart?.total,
      num_items: cart?.items.length,
      description: "add to cart",
    })
    trackEvent("InitiateCheckout", {
      content_id: cart?.id,
      content_type: "product",
      currency: cart?.region?.currency_code.toUpperCase(),
      value: cart?.total,
      num_items: cart?.items.length,
    })

    return () => {
      resetCart()
    }
  }, [])

  return !cart ? null : (
    <CheckoutProvider
      apiKey={apiKey}
      stripe={stripe}
      square={square}
      mpay={mpay}
    >
      <main>
        <section className="p-0 half-bg-light checkout-sec">
          <div className="container-fluid">
            <CheckoutLoader />
            <div className="row">
              <div className="col-sm-12 col-lg-7">
                <CheckoutForm storeData={storeData} />
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
