import { IS_BROWSER } from "@lib/constants"
import { useCheckout } from "@lib/context/checkout-context"
import { useEffect, useRef } from "react"

function PaymentSquare() {
  const { square, setPaymentMethod, cart } = useCheckout()
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!IS_BROWSER) return
    if (!cardRef.current) return
    if (!window.Square) return
    if (!cart?.total) return

    const Square = window.Square
    const payments = Square.payments(
      square?.applicationId ?? "",
      square?.locationId ?? ""
    )

    payments.card().then((card: any) => {
      card.attach("#card")

      setPaymentMethod(card)
    })

    return () => {
      if (cardRef.current) {
        cardRef.current.innerHTML = ""
      }
    }
  }, [IS_BROWSER, cart])

  return (
    <div>
      <div id="card" ref={cardRef}></div>
    </div>
  )
}
export default PaymentSquare
