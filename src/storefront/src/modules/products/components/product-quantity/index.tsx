import { useProductActions } from "@lib/context/product-context"
import Minus from "@modules/common/icons/minus"
import Plus from "@modules/common/icons/plus"

export default function Quantity({}) {
  const { quantity, decreaseQuantity, increaseQuantity } = useProductActions()

  return (
    <div className="border !border-gray-900 inline-flex items-center justify-around">
      <button className="p-2 text-xl" type="button" onClick={decreaseQuantity}>
        <Minus size="20" />
      </button>
      <button
        type="button"
        className="relative inline-flex items-center px-4 py-2 font-semibold text-gray-900 focus:z-10"
      >
        {quantity}
      </button>
      <button className="p-2 text-xl" type="button" onClick={increaseQuantity}>
        <Plus size="20" />
      </button>
    </div>
  )
}
