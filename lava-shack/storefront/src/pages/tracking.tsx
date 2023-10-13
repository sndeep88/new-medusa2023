import { medusaClient } from "@lib/config"
import { IS_BROWSER } from "@lib/constants"
import { Order } from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import Layout from "@modules/layout/templates"
import SkeletonOrderConfirmed from "@modules/skeletons/templates/skeleton-order-confirmed"
import { useMutation, useQuery } from "@tanstack/react-query"
import clsx from "clsx"
import { formatAmount } from "medusa-react"
import moment from "moment"
import { useRouter } from "next/router"
import { FormEvent, ReactElement, useState } from "react"
import { NextPageWithLayout } from "types/global"

async function findOrder(email: string) {
  return medusaClient.client.request("POST", `/store/search-orders`, {
    q: email,
    // fields:
    //   "id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code",
  })
}

async function fetchTrackingConfig() {
  return medusaClient.client
    .request("GET", "/store/system-config?provider=dummy&type=tracking")
    .then((res) =>
      res.configs.reduce(
        (configs: any, conf: any) => ({
          ...configs,
          [conf.key.replace("dummy_", "")]:
            conf.dataType === "boolean"
              ? conf.value === "true"
              : conf.dataType === "number"
              ? Number(conf.value)
              : conf.value,
        }),
        {}
      )
    )
}

const Tracking: NextPageWithLayout<any> = (props) => {
  const [email, setEmail] = useState("")
  const [error, seterror] = useState<string | null>(null)
  const router = useRouter()

  const { mutateAsync, data: { orders } = {} } = useMutation<
    { orders: Order[]; count: number },
    unknown,
    string
  >(findOrder, {
    mutationKey: ["lookup_order"],
  })

  const { isLoading, data, isSuccess, isError } = useQuery(
    ["get_order_tracking"],
    () => fetchTrackingConfig(),
    {
      staleTime: Infinity,
    }
  )

  const onTrack = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (
      !email ||
      !email.trim().match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g)
    ) {
      seterror("Please enter a valid email address")
      return
    }

    // console.log(email)

    try {
      const { count, orders } = await mutateAsync(email)
      console.log({ count })
      if (count === 0) {
        throw new Error(
          "Cannot find order with this email address. Please try again."
        )
      }

      if (count === 1 && orders) {
        router.push(`/tracking/${orders[0].id}`)
        return
      }
    } catch (err) {
      console.log({ err })
      seterror("Cannot find order with this email address. Please try again.")
    }
  }

  if (isLoading) {
    return <SkeletonOrderConfirmed />
  }

  if (isError) {
    if (IS_BROWSER) {
      router.replace("/404")
    }

    return <SkeletonOrderConfirmed />
  }

  if (data && !data.enableTrackingPage) {
    if (IS_BROWSER) {
      router.replace("/404")
    }

    return <SkeletonOrderConfirmed />
  }

  return (
    <div className="bg-gray-50 py-6 min-h-[calc(100vh-64px)]">
      <div className="content-container flex justify-center">
        <div className="max-w-4xl h-full bg-white w-full divide-y divide-gray-300">
          <div className="p-2.5 md:p-10 flex flex-col gap-y-5">
            <h2 className="text-xl-semi font-bold uppercase text-gray-700 text-center">
              You can track your order by simply entering your email address
            </h2>
            <form onSubmit={onTrack} className="contents">
              <div className="">
                <input
                  type="text"
                  name={"email"}
                  value={email}
                  placeholder="Email address"
                  className="border border-gray-300 rounded-sm px-2 py-2 w-full"
                  // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  onChange={(e) => {
                    setEmail(e.target.value.trim())
                    seterror(null)
                  }}
                />
                <span
                  className={clsx(
                    {
                      hidden: !error,
                    },
                    "text-red-500 text-small-regular italic"
                  )}
                >
                  * {error}
                </span>
              </div>
              <Button
                variant="primary"
                className=" text-white uppercase text-xl-semi"
                type="submit"
              >
                Track
              </Button>
            </form>
          </div>

          {orders && orders.length > 1 && (
            <div className="p-2.5 md:p-10 flex flex-col gap-y-5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-2 px-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Order
                    </th>
                    <th
                      scope="col"
                      className="px-3.5 py-2 text-left text-sm font-semibold text-gray-900"
                    >
                      Created At
                    </th>
                    <th
                      scope="col"
                      className="px-3.5 py-2 text-left text-sm font-semibold text-gray-900"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr
                      key={order.display_id}
                      className="hover:bg-gray-50 hover:cursor-pointer transition-all duration-300"
                      onClick={() => {
                        router.push(`/tracking/${order.id}`)
                      }}
                    >
                      <td className="whitespace-nowrap py-2 px-3.5 text-sm font-medium text-gray-900 ">
                        #{order.display_id}
                      </td>
                      <td className="whitespace-nowrap py-2 px-3.5 text-sm text-gray-800">
                        {moment(order.created_at).format("DD MMM YYYY")}
                      </td>
                      <td className="whitespace-nowrap py-2 px-3.5 text-sm text-gray-800">
                        {formatAmount({
                          amount: order.total,
                          region: order.region,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

Tracking.getLayout = (page: ReactElement, storeData: any) => (
  <Layout storeData={storeData}>{page}</Layout>
)

export default Tracking
