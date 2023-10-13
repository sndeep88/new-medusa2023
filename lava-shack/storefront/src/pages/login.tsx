import LoginTemplate from "@modules/account/templates/login-template"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { NextPageWithLayout, SharedPageProps } from "types/global"

const Login: NextPageWithLayout<SharedPageProps> = (props) => {
  return (
    <>
      <Head storeData={props.storeData}
        icon={props.storeData?.siteIcon}
        title="Sign in"
        description="Sign in to your account."
      />
      <LoginTemplate />
    </>
  )
}

Login.getLayout = (page, storeData) => {
  return <Layout storeData={storeData}>{page}</Layout>
}

export default Login
