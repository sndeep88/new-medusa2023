import { useRouter } from "next/router"
import Script from "next/script"
import { useEffect, useState } from "react"
import * as fbp from "lib/pixel"
import { Pixel, TrackingType } from "types/global"
import Head from "next/head"

function FbPixel({ pixels }: { pixels: Pixel[] }) {
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()

  const GTM_ID = pixels.filter((pixel) => pixel.type === TrackingType.Gg)[0]
    ?.pixel_id

  useEffect(() => {
    if (!loaded) return

    fbp.pageview({ url: router.pathname })

    const handleRouteChange = (url: string) => {
      fbp.pageview({ url })
    }

    router.events.on("routeChangeComplete", handleRouteChange)

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events, loaded])

  return (
    <>
      <Script
        id="fb-pixels"
        src="/scripts/fb-pixel.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
        data-pixel-ids={pixels
          .filter((p) => p.type === TrackingType.Fb)
          .map((p) => p.pixel_id)
          .join(",")}
      />
      {pixels
        .filter((p) => p.type === TrackingType.Fb)
        .map((pixel) => (
          <noscript key={pixel.id}>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${pixel.pixel_id}&ev=PageView&noscript=1`}
            />
          </noscript>
        ))}

      <Script
        id="tiktok-pixels"
        src="/scripts/tiktok-pixel.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
        data-pixel-ids={pixels
          .filter((p) => p.type === TrackingType.Tiktok)
          .map((p) => p.pixel_id)
          .join(",")}
      />

      {GTM_ID && (
        <>
          <Head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GTM_ID}', {
                page_path: window.location.pathname,
              });
            `,
              }}
            />
          </Head>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
            }}
          />
        </>
      )}
    </>
  )
}
export default FbPixel
