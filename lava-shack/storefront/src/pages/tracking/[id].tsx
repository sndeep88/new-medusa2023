import { ReactElement } from "react"

import Layout from "@modules/layout/templates"
import { medusaClient } from "@lib/config"
import { GetStaticPaths, GetStaticProps } from "next"
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import SkeletonOrderConfirmed from "@modules/skeletons/templates/skeleton-order-confirmed"
import { IS_BROWSER } from "@lib/constants"
import Head from "@modules/common/components/head"
import { NextPageWithLayout, SharedPageProps } from "types/global"
import { TrackingTemplate } from "@modules/tracking/tracking-template"

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

const TrackingPage: NextPageWithLayout<SharedPageProps> = (props) => {
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

  const {
    data: trackingData,
    isLoading: trackingLoading,
    isError: trackingError,
  } = useQuery(["get_tracking_config"], () => fetchTrackingConfig(), {
    enabled: id.length > 0,
    staleTime: Infinity,
  })

  if (isLoading || trackingLoading) {
    return <SkeletonOrderConfirmed />
  }

  if (isError || trackingError) {
    if (IS_BROWSER) {
      router.replace("/404")
    }

    return <SkeletonOrderConfirmed />
  }

  console.log({ trackingData })
  if (trackingData && !trackingData.enableTrackingPage) {
    console.log("error")
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
          title="Tracking Order"
          description="You purchase was successful"
        />

        <TrackingTemplate order={data} trackingData={trackingData} />
      </>
    )
  }

  return <></>
}

TrackingPage.getLayout = (page: ReactElement, storeData: any) => {
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

export default TrackingPage
