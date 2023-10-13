import { Order } from "@medusajs/medusa"
import clsx from "clsx"
import moment from "moment"
import { Fragment, useEffect, useMemo } from "react"
import _ from "lodash"

type TrackingTimelineProps = {
  order: Order
}

const timelineMessages = {
  0: "Order received and shipped. Your order has been dispatched and is en route to our order control station for detailed confirmation and processing. We appreciate your business and will keep you updated on the progress of your order via this page, please check back every couple days.",
  1: "Order confirmation in progress. Our team is diligently working to verify the details of your order.",
  2: "Order confirmation complete. A dedicated staff member has been assigned to handle your order. Preliminary shipping arrangements are being made.",
  3: "Order processing initiated. Your order is being prepared for consignment booking.",
  4: "Order processing ongoing. ",
  5: "Order processing complete. ",
  6: "Your order is ready for Consignment booking, we are doing final checks. ",
  7: "Consignment booked.",
  8: "Parcel transportation initiated. Your order is on its way to the port warehouse.",
  9: "Item booked, we are waiting for vessel confirmation",
  10: "Awaiting vessel confirmation. We are coordinating with our shipping partners to secure a spot for your order. This might take 3-4 days",
  13: "Container booked. Your order has been securely packed and is ready for sea transport.",
  14: "Handed over to transporter.",
  15: "Awaiting the cargo ship",
  16: "Your parcel is now being transported to the cargo ship",
  19: "Departure scan. Your order has been loaded onto the ship and is ready to depart.",
  20: "Start moving. Your order has begun its sea journey.",
  21: "Out of coverage. Your order is in the high seas, updates will resume once it reaches the next port.",
  23: "In progress. Your order is on its way to the destination port.",
  24: "On the way to port. Your order is making good progress on its sea journey.",
  27: "In transit. Your order is expected to arrive at the port between 25-35 days from now.",
  57: "Port arrival. Your order has arrived at the destination port.",
  58: "Stop moving. Your order is being unloaded from the ship.",
  59: "Port departure. Your order is now being prepared for local delivery.",
  60: "Delay due to temporary volume surge. We appreciate your patience as we work to get your order to you as quickly as possible.",
  62: "Arrived overseas. Your order is now in the destination country and is being processed for customs clearance.",
  64: "Customs processing initiated. Your order will arrive at the customs within one week.",
  71: "Customs clearance complete. Your order is now being prepared for final delivery.",
  72: "Arrival Scan. Your order has been received at the local delivery hub.",
  73: "Waiting for unloading. Your order is in queue for unloading.",
  74: "Unloading completed. Your order is now being sorted for final delivery.",
  75: "Into Customs. Your order is being reviewed by customs officials.",
  76: "Awaiting presentation to customs commissioner. Your order is in queue for final customs clearance.",
  77: "Inbound into customs. Your order is being inspected by customs.",
  78: "Clearance in Progress. Your order is being cleared by customs.",
  79: "Awaiting instruction for customs clearance which can take up to 6 days.",
  85: "Released by customs. Your order has been cleared and is now being prepared for final delivery.",
  86: "Transferred to the warehouse. Your order is now at our local warehouse.",
  88: "Waiting for acceptance from partners.(EMS). Your order is being prepared for final delivery.",
  90: "EMS picked up. Your order is on its way to you.",
  91: "In transit. Your order is on its way to your delivery address.",
  95: "Item will be delivered within 2 weeks to customer.",
}

export default function TrackingTimeline({ order }: TrackingTimelineProps) {
  const percentDone = useMemo(() => {
    const dayPasses = moment().diff(moment(order.created_at), "days")
    console.log({ dayPasses })

    var done = Math.round((dayPasses / 95) * 100)
    // console.log({ done })

    // if (done >= 95) {
    //   done = 95
    // }

    // if (done <= 2) {
    //   done = 2
    // }

    // done = 95
    return done
  }, [])

  const timelines = useMemo(() => {
    const startDate = moment(order.created_at)
    return _.map(
      _.pickBy(timelineMessages, (value, key) => {
        return +key <= percentDone
      }),
      (value, key) => {
        console.log({ key, value })
        const date =
          startDate.diff(moment(), "day") === 0
            ? startDate
            : startDate.clone().add(+key, "d")
        return {
          message: value,
          date,
        }
      }
    )
  }, [percentDone])

  useEffect(() => {
    console.log({ timelines })
  }, [timelines])

  return (
    <div className="flow-root p-2.5 md:p-10 ">
      <h2 className="text-xl-semi font-bold uppercase text-gray-700">
        Shipping Info
      </h2>
      <div className="mt-8">
        <ul role="list" className="-mb-8">
          {timelines.map((timeline, idx) => (
            <li key={idx} className="border !border-dashed border-gray-400 p-3">
              <div className="relative pb-8">
                {idx !== timelines.length - 1 ? (
                  <span
                    className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-start space-x-3">
                  <div className="relative">
                    <div className="rounded w-fit px-3 py-1 bg-sky-400 text-white">
                      {timeline.date.format("DD MMM YYYY")}
                    </div>
                    <div className="relative w-[90%] left-10 ml-px mt-2 text-sm text-gray-700">
                      <p>{timeline.message}</p>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
