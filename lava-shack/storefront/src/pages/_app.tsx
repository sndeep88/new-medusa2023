import { MEDUSA_BACKEND_URL, medusaClient, queryClient } from "@lib/config"
import { AccountProvider } from "@lib/context/account-context"
import { CartDropdownProvider } from "@lib/context/cart-dropdown-context"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"
import { StoreProvider } from "@lib/context/store-context"
import { Hydrate } from "@tanstack/react-query"
import { CartProvider, MedusaProvider } from "medusa-react"

import "styles/globals.css"

import { AppPropsWithLayout, Pixel, TrackingType } from "types/global"

import App, { AppContext } from "next/app"
import FbPixel from "@modules/fb-pixel"
import Loading from "@modules/common/components/loading"
import Script from "next/script"

type AppOwnProps = {
  storeData: any
  pixels: Pixel[]
}

const fetchStoreData = async () => {
  return await medusaClient.client
    .request("GET", `/store/extend-store`)
    .catch((_) => {})
}

const fetchFacebookPixels = async () => {
  return await medusaClient.client.request("GET", `/store/pixels`)
}

function MyApp({
  Component,
  pageProps,
  storeData,
  pixels,
}: AppPropsWithLayout<{
  dehydratedState?: unknown
  storeData: any
  square?: any
}> &
  AppOwnProps) {
  const getLayout = Component.getLayout ?? ((page) => page)

  pageProps["storeData"] = storeData

  return (
    <>
      <FbPixel pixels={pixels} />

      <MedusaProvider
        baseUrl={MEDUSA_BACKEND_URL}
        queryClientProviderProps={{
          client: queryClient,
        }}
      >
        <Hydrate state={pageProps.dehydratedState}>
          <CartDropdownProvider>
            <MobileMenuProvider>
              <CartProvider>
                <StoreProvider>
                  <AccountProvider>
                    <Loading />
                    {getLayout(<Component {...pageProps} />, storeData)}
                  </AccountProvider>
                </StoreProvider>
              </CartProvider>
            </MobileMenuProvider>
          </CartDropdownProvider>
        </Hydrate>
      </MedusaProvider>

      <Script src="https://api.myuser.com/js/checkout.js" />
    </>
  )
}

MyApp.getInitialProps = async (context: AppContext) => {
  const ctx = (await App.getInitialProps(context)) as any

  const res = await fetchStoreData()
  const pixelRes = await fetchFacebookPixels()

  return {
    ...ctx,
    storeData: res.extendStore ?? null,
    pixels: pixelRes.pixels ?? [],
  }
}

export default MyApp
