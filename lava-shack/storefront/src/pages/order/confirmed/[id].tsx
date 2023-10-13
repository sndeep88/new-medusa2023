import { medusaClient } from "@lib/config"
import { IS_BROWSER } from "@lib/constants"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import SkeletonOrderConfirmed from "@modules/skeletons/templates/skeleton-order-confirmed"
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { NextPageWithLayout, SharedPageProps } from "types/global"

const fetchOrder = async (id: string) => {
  return await medusaClient.orders.retrieve(id).then(({ order }) => order)
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

const Confirmed: NextPageWithLayout<SharedPageProps> = (props) => {
  const router = useRouter()

  const id = typeof router.query?.id === "string" ? router.query.id : ""

  const { isSuccess, data, isLoading, isError } = useQuery(
    ["get_order_confirmed", id],
    () => fetchOrder(id),
    {
      enabled: id.length > 0,
      staleTime: Infinity,
    }
  )

  const { data: trackingData } = useQuery(
    ["get_tracking_config"],
    () => fetchTrackingConfig(),
    {
      enabled: id.length > 0,
      staleTime: Infinity,
    }
  )

  if (isLoading) {
    return <SkeletonOrderConfirmed />
  }

  if (isError) {
    if (IS_BROWSER) {
      router.replace("/404")
    }

    return <SkeletonOrderConfirmed />
  }

  if (isSuccess) {
    return (
      <>
        <Head
          storeData={props.storeData}
          icon={props.storeData?.siteIcon}
          title="Order Confirmed"
          description="You purchase was successful"
        />

        <OrderCompletedTemplate
          order={data}
          showTracking={trackingData && trackingData.showTrackingUrl}
        />
      </>
    )
  }

  return <></>
}

Confirmed.getLayout = (page: ReactElement, storeData: any) => {
  return <Layout storeData={storeData}>{page}</Layout>
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(["get_order_confirmed", id], () =>
    fetchOrder(id)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Confirmed
