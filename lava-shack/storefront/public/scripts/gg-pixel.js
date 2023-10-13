const GG_PIXEL_IDS = document.currentScript.getAttribute("data-pixel-ids")
console.log({ GG_PIXEL_IDS })

!(function initGg(w, d, s, l, i) {
  w[l] = w[l] || []
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" })
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != "dataLayer" ? "&l=" + l : ""
  j.async = true
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl
  f.parentNode.insertBefore(j, f)
})(window, document, "script", "dataLayer", GG_PIXEL_IDS.split(",")[0])
