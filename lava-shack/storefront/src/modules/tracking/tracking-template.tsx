import { Order } from "@medusajs/medusa"
import OrderDetails from "@modules/order/components/order-details"
import TrackingTimeline from "./tracking-timeline"
import TrackingDetail from "./tracking-detail"

type TrackingTemplateProps = {
  order: Order
  trackingData: any
}

export const TrackingTemplate = ({
  order,
  trackingData,
}: TrackingTemplateProps) => {
  return (
    <div className="bg-gray-50 py-6 min-h-[calc(100vh-64px)]">
      <div className="content-container grid grid-cols-1 lg:grid-cols-2 gap-3.5 lg:gap-10">
        <div className="bg-white w-full">
          <TrackingDetail order={order} trackingInfo={trackingData} />
        </div>

        <div className="bg-white w-full">
          <TrackingTimeline order={order} />
        </div>
      </div>
    </div>
  )
}
