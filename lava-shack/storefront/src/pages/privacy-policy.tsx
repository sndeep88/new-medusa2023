import Breadcrumb from "@modules/checkout/components/breadcrumb"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import PrivacyPolicy from "@modules/privacy-policy"

import { ReactElement } from "react"
import { NextPageWithLayout, SharedPageProps } from "types/global"

const PrivacyPolicyPage: NextPageWithLayout<SharedPageProps> = (props) => {
  return (
    <>
      <Head storeData={props.storeData} icon={props.storeData?.siteIcon} title="Privacy Policy" />
      <div className="static-page__container">
        <div className="static-page__breadcrumb">
          <Breadcrumb
            pages={[{ name: "PRIVACY POLICY", href: "/privacy-policy" }]}
          />
        </div>
        <h1 className="static-page__title "> PRIVACY POLICY </h1>
        <PrivacyPolicy />
      </div>
    </>
  )
}

PrivacyPolicyPage.getLayout = (page: ReactElement, storeData: any) => {
  return <Layout storeData={storeData}>{page}</Layout>
}

export default PrivacyPolicyPage
