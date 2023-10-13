import { medusaClient } from "@lib/config"
import { IS_BROWSER } from "@lib/constants"
import CheckoutTemplate from "@modules/checkout/templates"
import Head from "@modules/common/components/head"
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next"
import { useEffect } from "react"
import { SharedPageProps } from "types/global"

const Checkout: NextPage<SharedPageProps> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps> &
    SharedPageProps
) => {
  useEffect(() => {
    if (!IS_BROWSER) return
    if (!props.square) return

    const script = document.createElement("script")
    script.id = "square-js"
    script.src =
      props.square.environment === "production"
        ? "https://web.squarecdn.com/v1/square.js"
        : "https://sandbox.web.squarecdn.com/v1/square.js"

    script.onload = () => {}
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [IS_BROWSER, props.square])

  // console.log(props.mpay) 

  return (
    <>
      <Head
        storeData={props.storeData}
        icon={props.storeData?.siteIcon}
        title="Checkout"
      />
      <CheckoutTemplate
        apiKey={props.apiKey}
        stripe={props.stripe}
        storeData={props.storeData}
        square={props.square}
        mpay={props.mpay}
      />
    </>
  )
}

async function loadGgApi() {
  return medusaClient.client.request(
    "GET",
    "/store/system-config?provider=google&type=google-api"
  )
}

async function getStripeConf() {
  return medusaClient.client.request(
    "GET",
    "/store/system-config?provider=stripe&type=payment"
  )
}

async function getSquareConf() {
  return medusaClient.client.request(
    "GET",
    "/store/system-config?provider=square&type=payment"
  )
}

async function loadMpay() {
  return medusaClient.client.request(
    "GET",
    "/store/system-config?provider=mpay&type=payment"
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { configs } = await loadGgApi()
  const stripeConf = await getStripeConf()
  // const squareConf = await getSquareConf()
  const mpayConf = await loadMpay()

  return {
    props: {
      apiKey: configs.find((cfg: any) => cfg.key === "google_api-key")?.value,
      stripe: stripeConf.configs
        .filter((cfg: any) => cfg.key === "stripe_publicKey")
        .reduce(
          (obj: any, item: any) => ({
            [item.key.replace("stripe_", "")]: item.value,
          }),
          {}
        ),
      // square: squareConf.configs
      //   .filter((cfg: any) =>
      //     ["applicationId", "locationId", "environment"].includes(
      //       cfg.key.replace("square_", "")
      //     )
      //   )
      //   .reduce(
      //     (obj: any, item: any) => ({
      //       ...obj,
      //       [item.key.replace("square_", "")]: item.value,
      //     }),
      //     {}
      //   ),
      mpay: mpayConf.configs
        .filter(
          (cfg: any) =>
            cfg.key.includes("publicKey") || cfg.key.includes("implement")
        )
        .reduce(
          (obj: any, item: any) => ({
            ...obj,
            [item.key.replace("mpay_", "")]:
              item.dataType === "string"
                ? item.value
                : item.dataType === "boolean"
                ? item.value === "true"
                : item.value,
          }),
          {}
        ),
    },
  }
}

export default Checkout
