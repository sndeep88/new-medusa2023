import ProductActions from "@modules/products/components/product-actions"
import React from "react"
import { Product } from "types/medusa"

type ProductInfoProps = {
  product: Product
  prodDesc: any
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, prodDesc }) => {
  return (
    <div className="product-detail" id="product-detail">
      <ProductActions product={product} prodDesc={prodDesc} />
    </div>
  )
}

export default ProductInfo
