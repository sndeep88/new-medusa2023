import { Order } from "@medusajs/medusa"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import clsx from "clsx"
import Link from "next/link"
import React from "react"

type OrderCompletedTemplateProps = {
  order: Order
  showTracking?: boolean
}

const OrderCompletedTemplate: React.FC<OrderCompletedTemplateProps> = ({
  order,
  showTracking = false,
}) => {
  return (
    <div className="bg-gray-50 py-6 min-h-[calc(100vh-64px)]">
      <div className="content-container flex justify-center">
        <div className="max-w-4xl h-full bg-white w-full">
          <OrderDetails order={order} />
          <Items
            items={order.items}
            region={order.region}
            cartId={order.cart_id}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-2.5 md:p-10 border-b border-gray-200">
            <ShippingDetails
              shippingMethods={order.shipping_methods}
              address={order.shipping_address}
            />
            <OrderSummary order={order} />
          </div>
          <div
            className={clsx(
              "grid grid-cols-1 lg:grid-cols-1 gap-4 p-2.5 md:p-10 border-b border-gray-200 justify-content-center align-self-center text-center",
              { hidden: !showTracking   }
            )}
          >
            <div>
              <h2 className="text-base-semi">Tracking information </h2>
              <Link href={`/tracking/${order.id}`}>
                <a className="flex items-center justify-center px-5 py-[10px] font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm text-white bg-primary  text-white uppercase text-xl-semi">Click to Track the Order</a>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-2.5 md:p-10">
            <Help />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCompletedTemplate
