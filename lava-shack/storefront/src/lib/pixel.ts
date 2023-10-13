export const pageview = (options = {}) => {
  ;(window as any)?.fbq("track", "PageView", options)
  ;(window as any)?.ttq?.page()
}

export const ggPageview = ({
  tracking_id,
  url,
}: {
  tracking_id: string
  url: string
}) => {
  ;(window as any).gtag("config", tracking_id, {
    page_path: url,
  })
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const trackEvent = (name: string, options = {}) => {
  setTimeout(() => {
    ;(window as any)?.fbq("track", name, options)
    ;(window as any)?.ttq?.track(name, options)
    // ;(window as any)?.dataLayer?.push({ event: name, ...options })
    ;(window as any).gtag("event", name, {
      ...options,
    })
  }, 500)
}
