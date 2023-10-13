import { useProductActions } from "@lib/context/product-context"
import Minus from "@modules/common/icons/minus"
import Plus from "@modules/common/icons/plus"

export default function Quantity({}) {
  const { quantity, decreaseQuantity, increaseQuantity } = useProductActions()

  return (
    <div className="qty-box">
      <button className="sub" id="sub" type="button" onClick={decreaseQuantity}>
        <Minus size="32" />
      </button>
      <input value={quantity} readOnly />
      <button className="add" type="button" onClick={increaseQuantity}>
        <Plus size="32" />
      </button>
    </div>
  )
}
