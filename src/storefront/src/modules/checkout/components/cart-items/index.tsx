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
    <>
      {items.map((item) => {
        return (
          <div className="product-list mb-3" key={item.id}>
            <div className="d-flex align-items-center1">
              <div className="prod-img">
                <div className="img-thumbnail">
                  <Thumbnail
                    thumbnail={item?.thumbnail}
                    size="cart-thumbnail"
                  />
                </div>
                <span className="item-count">{item.quantity}</span>
              </div>
              <div className="ms-3 font-75">
                {/* <p className="font-semibold text-gray-900">{item.title}</p> */}
                <p className="m-0">
                  {item.title} - {item.variant.title}
                </p>
              </div>
            </div>

            <div className="prc">
              {formatAmount({
                amount: item.total || 0,
                region: region,
                includeTaxes: false,
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}
export default CartItems
