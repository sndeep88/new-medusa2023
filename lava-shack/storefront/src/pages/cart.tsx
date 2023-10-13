import CartTemplate from "@modules/cart/templates"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout, SharedPageProps } from "types/global"

const Cart: NextPageWithLayout<SharedPageProps> = (props) => {
  return (
    <>
      <Head storeData={props.storeData}
        icon={props.storeData?.siteIcon}
        title="Shopping Bag"
        description="View your shopping bag"
      />
      <CartTemplate />
    </>
  )
}

Cart.getLayout = (page: ReactElement, storeData: any) => {
  return <Layout storeData={storeData}>{page}</Layout>
}

export default Cart
