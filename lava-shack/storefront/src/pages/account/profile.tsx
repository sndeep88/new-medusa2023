import AccountLayout from "@modules/account/templates/account-layout"
import ProfileTemplate from "@modules/account/templates/profile-template"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout, SharedPageProps } from "types/global"

const Profile: NextPageWithLayout<SharedPageProps> = (props) => {
  return (
    <>
      <Head storeData={props.storeData}
        icon={props.storeData?.siteIcon}
        title="Profile"
        description="View and edit your profile."
      />
      <ProfileTemplate />
    </>
  )
}

Profile.getLayout = (page: ReactElement, storeData: any) => {
  return (
    <Layout storeData={storeData}>
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  )
}

export default Profile
