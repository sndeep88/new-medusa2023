import AccountLayout from "@modules/account/templates/account-layout"
import AddressesTemplate from "@modules/account/templates/addresses-template"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout, SharedPageProps } from "types/global"

const Addresses: NextPageWithLayout<SharedPageProps> = (props) => {
  return (
    <>
      <Head storeData={props.storeData}
        icon={props.storeData?.siteIcon}
        title="Addresses"
        description="View your addresses"
      />
      <AddressesTemplate />
    </>
  )
}

Addresses.getLayout = (page: ReactElement, storeData: any) => {
  return (
    <Layout storeData={storeData}>
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  )
}

export default Addresses
