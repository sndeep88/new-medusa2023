import Breadcrumb from "@modules/checkout/components/breadcrumb"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import ShippingInfomation from "@modules/shipping-infomation"

import { ReactElement } from "react"
import { NextPageWithLayout, SharedPageProps } from "types/global"

const ShippingInfoPage: NextPageWithLayout<SharedPageProps> = (props) => {
  return (
    <>
      <Head storeData={props.storeData} icon={props.storeData?.siteIcon} title="Shipping Information" />
      <div className="static-page__container">
        <div className="static-page__breadcrumb">
          <Breadcrumb
            pages={[{ name: "SHIPPING INFORMATION", href: "/shipping-info" }]}
          />
        </div>
        <h1 className="static-page__title "> SHIPPING INFORMATION </h1>
        <ShippingInfomation />
      </div>
    </>
  )
}

ShippingInfoPage.getLayout = (page: ReactElement, storeData: any) => {
  return <Layout storeData={storeData}>{page}</Layout>
}

export default ShippingInfoPage
