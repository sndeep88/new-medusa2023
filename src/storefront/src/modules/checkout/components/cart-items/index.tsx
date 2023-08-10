import { LineItem, Region } from "@medusajs/medusa"
import Thumbnail from "@modules/products/components/thumbnail"
import { formatAmount } from "medusa-react"

const CartItems = ({
  items,
  region,
}: {
  items: LineItem[]
  region: Region
}) => {
  return (
    <div className="flex flex-col gap-y-3">
      {items.map((item) => {
        return (
          <div className="w-full flex items-center px-2 py-2" key={item.id}>
            <div className="p-1 relative bg-white rounded border border-gray-200">
              <Thumbnail thumbnail={item?.thumbnail} size="extra-small" />
              <span className="w-5 h-5 absolute -top-1 -right-1 bg-gray-500 rounded-full text-xs text-white flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="ml-5 flex-1">
              <p className="font-semibold text-gray-900">{item.title}</p>
              <p className="text-sm">{item.variant.title}</p>
            </div>

            <div className="flex-shrink-0">
              <p>
                {formatAmount({
                  amount: item.total || 0,
                  region: region,
                  includeTaxes: false,
                })}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default CartItems
