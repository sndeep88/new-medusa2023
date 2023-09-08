import { Cart } from "@medusajs/medusa"
import { formatAmount } from "medusa-react"
import React from "react"

type CartTotalsProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

const CartTotals: React.FC<CartTotalsProps> = ({ cart }) => {
  const {
    subtotal,
    discount_total,
    gift_card_total,
    tax_total,
    shipping_total,
    total,
  } = cart

  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: cart.region,
      includeTaxes: false,
    })
  }

  return (
    <>
      <div className="row mb-2">
        <span className="col-6">Subtotal</span>
        <span className="col-6 text-end">
          <strong>{getAmount(subtotal)}</strong>
        </span>
      </div>

      <>
        {!!discount_total && (
          <div className="row mb-2">
            <span>Discount</span>
            <span>- {getAmount(discount_total)}</span>
          </div>
        )}
        {!!gift_card_total && (
          <div className="row mb-2">
            <span>Gift card</span>
            <span>- {getAmount(gift_card_total)}</span>
          </div>
        )}
        <div className="row mb-2">
          <span className="col-6">Shipping</span>
          <span className="col-6 text-end">{getAmount(shipping_total)}</span>
        </div>
      </>

      <div className="row mb-2">
        <div className="col-6">
          <h5>Total</h5>
          <small>inc. {getAmount(tax_total)} VAT</small>
        </div>
        <div className="col-6 text-end">
          <h5>{getAmount(total)}</h5>
        </div>
      </div>
    </>
  )
}

export default CartTotals
