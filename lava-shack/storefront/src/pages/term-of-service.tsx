import Breadcrumb from "@modules/checkout/components/breadcrumb"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import TermOfService from "@modules/term-service"

import { ReactElement } from "react"
import { NextPageWithLayout, SharedPageProps } from "types/global"

const ContactPage: NextPageWithLayout<SharedPageProps> = (props) => {
  return (
    <>
      <Head storeData={props.storeData} icon={props.storeData?.siteIcon} title="Term of Service" />
      <div className="static-page__container">
        <div className="static-page__breadcrumb">
          <Breadcrumb
            pages={[{ name: "TERM OF SERVICE", href: "/term-of-service" }]}
          />
        </div>
        <h1 className="static-page__title "> TERM OF SERVICE </h1>
        <TermOfService />
      </div>
    </>
  )
}

ContactPage.getLayout = (page: ReactElement, storeData: any) => {
  return <Layout storeData={storeData}>{page}</Layout>
}

export default ContactPage
