import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import { useStore } from "@lib/context/store-context"
import { useRouter } from "next/router"

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
  variant,
}: ProductPreviewType) => {
  const { createBuynowCart, addItem } = useStore()
  const router = useRouter()

  const buynow = async () => {
    // console.log("buy now", { variant })
    if (!variant) return

    await createBuynowCart()
    addItem({
      variantId: variant.id,
      quantity: 1,
    })

    router.push("/checkout")
  }

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="product-item">
        <div className="product_image_wrap">
          <Thumbnail
            thumbnail={thumbnail}
            size="full"
            price={price}
            hoverable
            buynow={buynow}
          />
        </div>
        <div className="product-content">
          <h3 className="product-item-titles">
            <Link href={`/products/${handle}`}>
              <a>{title}</a>
            </Link>
          </h3>
          <div className="product-item-price">
            {price ? (
              <>
                <span className={"product-price"}>
                  {price.calculated_price}
                </span>
                {price.price_type === "sale" && (
                  <span className="line-through text-gray-500">
                    {price.original_price}
                  </span>
                )}
              </>
            ) : (
              <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPreview
