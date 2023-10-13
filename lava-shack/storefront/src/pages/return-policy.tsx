import Breadcrumb from "@modules/checkout/components/breadcrumb"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import ReturnPolicySection from "@modules/return-polixy"
import { ReactElement } from "react"
import { NextPageWithLayout, SharedPageProps } from "types/global"

const ReturnPolicyPage: NextPageWithLayout<SharedPageProps> = (props) => {
  return (
    <>
      <Head storeData={props.storeData} icon={props.storeData?.siteIcon} title="Return Policy" />
      <div className="static-page__container">
        <div className="static-page__breadcrumb">
          <Breadcrumb
            pages={[{ name: "RETURN POLICY", href: "/return-policy" }]}
          />
        </div>
        <h1 className="static-page__title "> RETURN POLICY </h1>
        <ReturnPolicySection />
      </div>
    </>
  )
}

ReturnPolicyPage.getLayout = (page: ReactElement, storeData: any) => {
  return <Layout storeData={storeData}>{page}</Layout>
}

export default ReturnPolicyPage
