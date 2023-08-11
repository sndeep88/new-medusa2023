import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import { Product } from "@medusajs/medusa"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import React, { useRef } from "react"
import ImageGallery from "../components/image-gallary"
import MobileActions from "../components/mobile-actions"

type ProductTemplateProps = {
  product: Product
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const info = useRef<HTMLDivElement>(null)

  // const inView = useIntersection(info, "0px")

  return (
    <ProductProvider product={product}>
      <div className="content-container flex flex-col gap-y-5 sm:gap-y-0 md:flex-row md:items-start md:gap-x-10 py-10 relative">
        <div className="flex-1 flex flex-col gap-y-8 w-full">
          <ImageGallery images={product.images} />
        </div>
        <div className="flex-1 flex flex-col " ref={info}>
          <ProductInfo product={product} />
          {/* <ProductTabs product={product} /> */}
        </div>
      </div>
      {/* <div className="content-container my-16 px-6 small:px-8 small:my-32">
        <RelatedProducts product={product} />
      </div> */}
      {/* <MobileActions product={product} show={!inView} /> */}
    </ProductProvider>
  )
}

export default ProductTemplate
