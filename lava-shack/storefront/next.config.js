const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

const MEDUSA_BACKEND_URL =
  process.env.MEDUSA_BACKEND_URL || "https://backend.lava-shack.com"

module.exports = withStoreConfig({
  features: store.features,
  reactStrictMode: true,
  images: {
    domains: [
      "medusa-public-images.s3.eu-west-1.amazonaws.com",
      "localhost",
      MEDUSA_BACKEND_URL.replace("https://", ""),
    ],
  },
  output: "standalone",
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))
