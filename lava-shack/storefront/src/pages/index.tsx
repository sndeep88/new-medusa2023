import Head from "@modules/common/components/head"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

type Props = {
  storeData: any
}

const Home: NextPageWithLayout<Props> = (props) => {
  return (
    <>
      <Head
        icon={props.storeData?.siteIcon}
        title="Home"
        storeData={props.storeData}
        description="Shop all available. Worldwide Shipping. Secure Payment."
      />
      <Hero bannerImage={props.storeData?.bannerImage} />
      {/* <FeaturedProducts maxProducts={16} /> */}
      <FeaturedProducts title="Latest Arrivals" maxProducts={16} />
    </>
  )
}

Home.getLayout = (page: ReactElement, storeData: any) => {
  return <Layout storeData={storeData}>{page}</Layout>
}

export default Home
