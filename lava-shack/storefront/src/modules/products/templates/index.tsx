import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import { Product } from "@medusajs/medusa"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import React, { useRef } from "react"
import ImageGallery from "../components/image-gallary"
import MobileActions from "../components/mobile-actions"
import ProductReview from "../components/product-review"

type ProductTemplateProps = {
  product: Product
  prodDesc: any
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  prodDesc,
}) => {
  const info = useRef<HTMLDivElement>(null)

  // const inView = useIntersection(info, "0px")

  return (
    <ProductProvider product={product}>
      <section className="pb-0">
        <div className="container-fluid">
          <div className="row product-image">
            <div className="col-md-6 mb-2 mb-md-4">
              <ImageGallery images={product.images} />
            </div>
            <div className="col-md-6 mb-4" ref={info}>
              <ProductInfo product={product} prodDesc={prodDesc} />
              {/* <ProductTabs product={product} /> */}
            </div>
          </div>
          {/* <div className="content-container my-16 px-6 small:px-8 small:my-32">
            <RelatedProducts product={product} />
          </div> */}
          {/* <MobileActions product={product} show={!inView} /> */}
        </div>
      </section>

      {/* <section id="review" className=" md:pt-[95px]">
        <div className="container-fluid pt-20">
          <ProductReview product={product} />
        </div>
      </section> */}
    </ProductProvider>
  )
}

export default ProductTemplate
