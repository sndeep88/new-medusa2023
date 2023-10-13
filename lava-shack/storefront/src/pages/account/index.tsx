import AccountLayout from "@modules/account/templates/account-layout"
import OverviewTemplate from "@modules/account/templates/overview-template"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout, SharedPageProps } from "types/global"

const Account: NextPageWithLayout<SharedPageProps> = (props) => {
  return (
    <>
      <Head storeData={props.storeData}
        icon={props.storeData?.siteIcon}
        title="Account"
        description="Overview of your account activity."
      />
      <OverviewTemplate />
    </>
  )
}

Account.getLayout = (page: ReactElement, storeData: any) => {
  return (
    <Layout storeData={storeData}>
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  )
}

export default Account
