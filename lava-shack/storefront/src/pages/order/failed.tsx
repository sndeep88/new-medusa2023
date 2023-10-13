import { IS_BROWSER } from "@lib/constants"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import Link from "next/link"

import { useRouter } from "next/router"
import { ReactElement } from "react"
import { NextPageWithLayout, SharedPageProps } from "types/global"

const Failed: NextPageWithLayout<SharedPageProps> = (props) => {
  const { query, replace } = useRouter()

  const message = query.message

  if (!message) {
    if (IS_BROWSER) {
      replace("/")
    }
    return <></>
  }

  return (
    <>
      <Head
        storeData={props.storeData}
        icon={props.storeData?.siteIcon}
        title="404"
        description="Something went wrong"
      />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        <h1 className="text-2xl-semi text-gry-900">Fail to place order</h1>
        <p className="text-small-regular text-gray-700">{message}</p>
        <Link href="/">
          <a className="mt-4 underline text-base-regular text-gray-900">
            Go to frontpage
          </a>
        </Link>
      </div>
    </>
  )
}

Failed.getLayout = (page: ReactElement, storeData: any) => {
  return <Layout storeData={storeData}>{page}</Layout>
}

export default Failed
