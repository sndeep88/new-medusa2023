import AboutUs from "@modules/about-us"
import Breadcrumb from "@modules/checkout/components/breadcrumb"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"

import { ReactElement } from "react"
import { NextPageWithLayout, SharedPageProps } from "types/global"

const AboutPage: NextPageWithLayout<SharedPageProps> = (props) => {
  return (
    <>
      <Head storeData={props.storeData} icon={props.storeData?.siteIcon} title="About Us" />
      <div className="static-page__container">
        <div className="static-page__breadcrumb">
          <Breadcrumb pages={[{ name: "ABOUT US", href: "/about" }]} />
        </div>
        <h1 className="static-page__title "> ABOUT US </h1>
        <AboutUs />
      </div>
    </>
  )
}

AboutPage.getLayout = (page: ReactElement, storeData: any) => {
  return <Layout storeData={storeData}>{page}</Layout>
}

export default AboutPage
