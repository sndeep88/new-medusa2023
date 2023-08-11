import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import Button from "@modules/common/components/button"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import Link from "next/link"

const FeaturedProducts = () => {
  const { data } = useFeaturedProductsQuery()

  return (
    <div className="">
      <div className="px-5 sm:px-10 py-12">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-3xl leading-6 text-gray-900">HOT SALE</span>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8">
          {data
            ? data.map((product) => (
                <li key={product.id}>
                  <ProductPreview {...product} />
                </li>
              ))
            : Array.from(Array(4).keys()).map((i) => (
                <li key={i}>
                  <SkeletonProductPreview />
                </li>
              ))}
        </ul>
      </div>

      <div className="flex items-center justify-center">
        <Link href="/products">
          <span className="px-3 py-2 bg-yellow-500 rounded-md text-white">
            Explore Products
          </span>
        </Link>
      </div>
    </div>
  )
}

export default FeaturedProducts
