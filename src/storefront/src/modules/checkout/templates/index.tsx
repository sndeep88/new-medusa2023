import { CheckoutProvider } from "@lib/context/checkout-context"

import CheckoutLoader from "../components/checkout-loader"
import CheckoutForm from "./checkout-form"
import CheckoutSummary from "./checkout-summary"
import { useStore } from "@lib/context/store-context"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useCart } from "medusa-react"

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
        {/* <div className="h-16 bg-white">
          <nav className="flex items-center h-full justify-between content-container">
            <button
              className="text-small-semi text-gray-700 flex items-center gap-x-2 uppercase flex-1 basis-0"
              onClick={returnToCart}
            >
              <ChevronDown className="rotate-90" size={16} />
              <span className="mt-px hidden small:block">
                Back to shopping cart
              </span>
              <span className="mt-px block small:hidden">Back</span>
            </button>
            <Link href="/">
              <a className="text-xl-semi">ACME</a>
            </Link>
            <div className="flex-1 basis-0" />
            
          </nav>
        </div> */}
        {/* <div className="relative">
          <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] gap-y-8 content-container gap-x-8 py-12">
            <CheckoutForm />
            <CheckoutSummary />
          </div>
        </div> */}
        {/* <div className="py-4 w-full flex items-center justify-center">
          <MedusaCTA />
        </div> */}

        <div className="w-full flex flex-col gap-y-5 lg:gap-y-0 py-10 lg:flex-row lg:max-w-7xl lg:mx-auto items-center md:items-start">
          <CheckoutForm />
          <CheckoutSummary />
        </div>
      </div>
    </CheckoutProvider>
  )
}

export default CheckoutTemplate
