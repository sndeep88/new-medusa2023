import { medusaClient } from "@lib/config"
import Breadcrumb from "@modules/checkout/components/breadcrumb"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import {
  GetServerSideProps,
  GetStaticPaths,
  InferGetServerSidePropsType,
} from "next"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"

import { ReactElement } from "react"
import { NextPageWithLayout, SharedPageProps } from "types/global"

async function fetchPage(slug: string) {
  return await medusaClient.client.request("GET", `/store/pages/${slug}`)
}

const Page: NextPageWithLayout<SharedPageProps> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps> &
    SharedPageProps
) => {
  console.log(props)
  const { page } = props ?? {}

  if (!page) {
    return null
  }

  return (
    <>
      <Head storeData={props.storeData} icon={props.storeData?.siteIcon} title={page.title} />
      <div className="static-page__container">
        <div className="static-page__breadcrumb">
          <Breadcrumb
            pages={[
              { name: page.title.toUpperCase(), href: "/pages/" + page.slug },
            ]}
          />
        </div>
        <h1 className="static-page__title">{page.title.toUpperCase()}</h1>
        <div
          className="static-page__content"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </>
  )
}

Page.getLayout = (page: ReactElement, storeData: any) => {
  return <Layout storeData={storeData}>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string

  const pageRes = await fetchPage(slug)

  return {
    props: {
      page: pageRes.page ?? null,
    },
  }
}

export default Page
