import { medusaClient } from "@lib/config"
import { IS_BROWSER } from "@lib/constants"
import { trackEvent } from "@lib/pixel"
import { getProductHandles } from "@lib/util/get-product-handles"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import ProductTemplate from "@modules/products/templates"
import SkeletonProductPage from "@modules/skeletons/templates/skeleton-product-page"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { is } from "cypress/types/bluebird"
import { useCart } from "medusa-react"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { ReactElement, useRef } from "react"
import {
  NextPageWithLayout,
  PrefetchedPageProps,
  SharedPageProps,
} from "types/global"

interface Params extends ParsedUrlQuery {
  handle: string
}

const fetchProduct = async (handle: string) => {
  return await medusaClient.products
    .list({ handle })
    .then(({ products }) => products[0])
}

const fetchProductDesc = async (handle: string) => {
  return await medusaClient.client.request(
    "GET",
    `/store/product/description/${handle}`
  )
}

const ProductPage: NextPageWithLayout<
  PrefetchedPageProps & SharedPageProps
> = ({ notFound, ...props }) => {
  const { query, isFallback, replace } = useRouter()
  const { cart } = useCart()

  const handle = typeof query.handle === "string" ? query.handle : ""
  const isContentView = useRef(false)

  const { data, isError, isLoading, isSuccess } = useQuery(
    [`get_product`, handle],
    () => fetchProduct(handle),
    {
      enabled: handle.length > 0,
      keepPreviousData: false,
    }
  )

  const { data: descData } = useQuery(
    ["get_product_desc", handle],
    () => fetchProductDesc(handle),
    {
      enabled: handle.length > 0,
      keepPreviousData: false,
    }
  )

  if (notFound) {
    if (IS_BROWSER) {
      replace("/404")
    }

    return <SkeletonProductPage />
  }

  if (isFallback || isLoading || !data) {
    return <SkeletonProductPage />
  }

  if (isError) {
    replace("/404")
  }

  if (isSuccess) {
    // console.log(data, handle);
    if (isContentView.current == false) {
      isContentView.current = true
      trackEvent("ViewContent", {
        content_ids: [data.id],
        content_id: data.id,
        content_type: "product",
        content_name: data.title,
        quantity: 1,
        description: data.description,
        currency: cart?.region?.currency_code.toUpperCase() ?? "USD",
        value: 0,
      })
    }
    return (
      <>
        <Head
          storeData={props.storeData}
          icon={props.storeData?.siteIcon}
          description={data.description}
          title={data.title}
          image={data.thumbnail}
        />
        {/* @ts-ignore */}
        <ProductTemplate product={data} prodDesc={descData} />
      </>
    )
  }

  return <></>
}

ProductPage.getLayout = (page: ReactElement, storeData: any) => {
  return <Layout storeData={storeData}>{page}</Layout>
}

// export const getStaticPaths: GetStaticPaths<Params> = async () => {
//   const handles = await getProductHandles()
//   return {
//     paths: handles.map((handle) => ({ params: { handle } })),
//     fallback: true,
//   }
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   const handle = context.params?.handle as string
//   const queryClient = new QueryClient()

//   await queryClient.prefetchQuery([`get_product`, handle], () =>
//     fetchProduct(handle)
//   )

//   const queryData = await queryClient.getQueryData([`get_product`, handle])

//   if (!queryData) {
//     return {
//       props: {
//         notFound: true,
//       },
//     }
//   }

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//       notFound: false,
//     },
//   }
// }

export default ProductPage
