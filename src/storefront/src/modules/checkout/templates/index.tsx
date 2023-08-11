import { CheckoutProvider } from "@lib/context/checkout-context"

import CheckoutLoader from "../components/checkout-loader"
import CheckoutForm from "./checkout-form"
import CheckoutSummary from "./checkout-summary"
import { useStore } from "@lib/context/store-context"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useCart } from "medusa-react"
import CheckoutButton from "../components/checkout-button"

const CheckoutTemplate = () => {
  const { resetCart, isQuickCheckout } = useStore()
  const { cart } = useCart()
  // const router = useRouter()

  // useEffect(() => {
  //   if (!cart || !cart.items.length) {
  //     router.push("/")
  //   }
  // }, [cart])

  useEffect(() => {
    return () => {
      if (isQuickCheckout) {
        resetCart()
      }
    }
  }, [])

  return !cart ? null : (
    <CheckoutProvider>
      <div className="min-h-screen">
        <CheckoutLoader />

        <div className="w-full grid grid-cols-1 gap-y-5 lg:gap-y-0 lg:grid-cols-5 items-center md:items-start">
          <div className="pl-0 xl:pl-48 lg:col-span-3 lg:flex lg:flex-col lg:items-end py-10">
            <CheckoutForm />

            {cart.id && (
              <div className="flex justify-end mt-4 px-5 md:px-10">
                <CheckoutButton />
              </div>
            )}
          </div>
          <div className="pr-0 xl:pr-48 lg:col-span-2 bg-checkout py-10 h-full">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </CheckoutProvider>
  )
}

export default CheckoutTemplate
