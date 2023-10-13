import Breadcrumb from "@modules/checkout/components/breadcrumb"
import Head from "@modules/common/components/head"
import ContactUs from "@modules/contact-us"
import Layout from "@modules/layout/templates"

import { ReactElement } from "react"
import { NextPageWithLayout, SharedPageProps } from "types/global"

const ContactPage: NextPageWithLayout<SharedPageProps> = (props) => {
  return (
    <>
      <Head storeData={props.storeData} icon={props.storeData?.siteIcon} title="Contact Us" />
      <div className="static-page__container">
        <div className="static-page__breadcrumb">
          <Breadcrumb pages={[{ name: "CONTACT US", href: "/contact" }]} />
        </div>
        <h1 className="static-page__title "> CONTACT US </h1>
        <ContactUs />
      </div>
    </>
  )
}

ContactPage.getLayout = (page: ReactElement, storeData: any) => {
  return <Layout storeData={storeData}>{page}</Layout>
}

export default ContactPage
