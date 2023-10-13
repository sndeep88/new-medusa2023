import AccountLayout from "@modules/account/templates/account-layout"
import OrdersTemplate from "@modules/account/templates/orders-template"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { NextPageWithLayout, SharedPageProps } from "types/global"

const Orders: NextPageWithLayout<SharedPageProps> = (props) => {
  return (
    <>
      <Head storeData={props.storeData}
        icon={props.storeData?.siteIcon}
        title="Orders"
        description="Overview of your previous orders."
      />
      <OrdersTemplate />
    </>
  )
}

Orders.getLayout = (page, storeData) => {
  return (
    <Layout storeData={storeData}>
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  )
}

export default Orders
