import { StoreGetProductsParams } from "@medusajs/medusa"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import InfiniteProducts from "@modules/products/components/infinite-products"
import RefinementList from "@modules/store/components/refinement-list"
import { useState } from "react"
import { NextPageWithLayout, SharedPageProps } from "types/global"

const Store: NextPageWithLayout<SharedPageProps> = (props) => {
  const [params, setParams] = useState<StoreGetProductsParams>({})

  return (
    <>
      <Head storeData={props.storeData}
        icon={props.storeData?.siteIcon}
        title="Store"
        description="Explore all of our products."
      />
      <section className="product-grid">
        {/* <RefinementList refinementList={params} setRefinementList={setParams} /> */}
        <InfiniteProducts params={params} />
      </section>
    </>
  )
}

Store.getLayout = (page, storeData) => (
  <Layout storeData={storeData}>{page}</Layout>
)

export default Store
