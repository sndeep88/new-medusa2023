import Breadcrumb from "@modules/checkout/components/breadcrumb"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout, SharedPageProps } from "types/global"
import FaqSection from "@modules/faq"
import Head from "@modules/common/components/head"

const FaqsPage: NextPageWithLayout<SharedPageProps> = (props) => {
  return (
    <>
      <Head storeData={props.storeData} icon={props.storeData?.siteIcon} title="FAQs" />
      <div className="static-page__container">
        <div className="static-page__breadcrumb">
          <Breadcrumb pages={[{ name: "FAQs", href: "/faqs" }]} />
        </div>
        <h1 className="static-page__title "> FAQs </h1>
        <FaqSection />
      </div>
    </>
  )
}

FaqsPage.getLayout = (page: ReactElement, storeData: any) => {
  return <Layout storeData={storeData}>{page}</Layout>
}

export default FaqsPage
