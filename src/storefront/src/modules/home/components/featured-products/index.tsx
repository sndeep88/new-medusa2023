import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
// import Button from "@modules/common/components/button"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import Link from "next/link"

const FeaturedProducts = () => {
  const { data } = useFeaturedProductsQuery()

  return (
    <section className="product-grid">
      <div className="container-fluid">
        <h2 className="section-title text-center">HOT SALE</h2>

        <div className="row">
          {data
            ? data.map((product) => (
                <ProductPreview {...product} key={product.id} />
              ))
            : Array.from(Array(4).keys()).map((i) => (
                <SkeletonProductPreview key={i} />
              ))}
        </div>

        <div className="text-center mt-4 mt-md-5">
          <Link href="/products">
            <a className="btn btn-primary">Explore Products</a>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
