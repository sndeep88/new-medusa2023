import { Order } from "@medusajs/medusa"
import { formatAmount } from "medusa-react"
import moment from "moment"
import { useMemo } from "react"

type TrackingDetailProps = {
  order: Order
  trackingInfo: any
}

function TrackingDetail({ order, trackingInfo }: TrackingDetailProps) {
  const percentDone = useMemo(() => {
    const dayPasses = moment().diff(moment(order.created_at), "days")

    const res = Math.round(dayPasses / 95 * 100);
    if (res > 95) {
      return 95;
    }
    if (res < 2) {
      return 2;
    }
    return res;
  }, [])

  console.log({ order })

  return (
    <div className="flow-root p-2.5 md:p-10 ">
      <h2 className="text-xl-semi font-bold uppercase text-gray-700">
        Tracking Information
      </h2>
      <div className="mt-8">
        <div className="w-full h-6 mb-4 bg-gray-200 rounded  overflow-hidden relative">
          <div
            className="h-full bg-blue-600 dark:bg-blue-500"
            style={{ width: percentDone + "%" }}
          />
          <span className="text-white absolute left-2 inset-y-0">
            {percentDone + "%"}
          </span>
        </div>

        <div className="mt-5">
          <div>
            <div className="mb-3 flex flex-col md:flex-row items-center">
              <h6 className="w-1/3 text-large-semi text-gray-800 font-bold">
                Date Of Payment:{" "}
              </h6>
              <span>
                {moment(
                  order.payments?.[0].captured_at ?? order.created_at
                ).format("DD MMM YYYY")}
              </span>
            </div>
            <div className="mb-3 flex items-center">
              <h6 className="w-1/3 text-large-semi text-gray-800 font-bold">
                Payment Amount:{" "}
              </h6>
              <span>
                {formatAmount({
                  amount: order.total,
                  region: order.region,
                })}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p>
              Hello{" "}
              {order.customer.first_name ?? order.shipping_address.first_name},
              thank you so much for your order! We{"'"}re excited to get your
              items ready for you. We{"'"}ll keep you updated on the progress of
              delivery, please use this page to track your order and refresh the
              page to get new available updates
            </p>

            <p>
              If you have any issues about shipping or returns. Please email us
              using the email address below. Our team pledged to respond to all
              emails within 24 hours.
            </p>

            <div className="w-full py-3 bg-sky-400 text-white text-center">
              <p>Contact email: {trackingInfo.contactEmail}</p>
              <p>Contact Phone Number: {trackingInfo.contactPhone}</p>
              <p>Tracking Number: {order.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TrackingDetail
