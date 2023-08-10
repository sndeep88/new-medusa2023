import { useCheckout } from "@lib/context/checkout-context"
import Breadcrumb from "@modules/checkout/components/breadcrumb"
import CheckoutInfo from "@modules/checkout/components/checkout-info"
import CheckoutPayment from "@modules/checkout/components/checkout-payment"
import CheckoutShipping from "@modules/checkout/components/checkout-shipping"
import StepUIProvider, {
  useStepUIContext,
} from "@modules/checkout/components/step-wrapper"
import Link from "next/link"

const steps = [
  { name: "Information", href: "#" },
  { name: "Shipping", href: "#" },
  { name: "Payment", href: "#" },
]

const CheckoutForm = () => {
  return (
    <StepUIProvider steps={steps}>
      <div className="flex-1 w-full bg-white px-3 sm:px-5 lg:px-10">
        <Link href="/">
          <a className="navbar-brand">
            Shopping
            <br /> Center
          </a>
        </Link>
        <div className="mt-3">
          <Breadcrumb pages={steps} />
        </div>

        <div className="mt-4">
          <CheckoutSteps />
        </div>
      </div>
    </StepUIProvider>
  )
}

const CheckoutSteps = () => {
  const { currentStep } = useStepUIContext()
  const { cart } = useCheckout()

  switch (currentStep) {
    case 0: // info
      return <CheckoutInfo />
    case 1: // shipping
      return !cart?.id ? null : <CheckoutShipping cart={cart} />
    case 2: // payment
      return !cart?.id ? null : <CheckoutPayment cart={cart} />
    default:
      return null
  }
}

export default CheckoutForm
