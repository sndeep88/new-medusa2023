import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import { useStore } from "@lib/context/store-context"
import { useRouter } from "next/router"
import { trackEvent } from "@lib/pixel"

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
  variant,
  review = { score: 0, amount: 0 },
}: ProductPreviewType) => {
  const { createBuynowCart, addItem } = useStore()
  const router = useRouter()

  const buynow = async () => {
    trackEvent("Checkout", { handle: handle, variant_id: variant?.id })
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
    <Link href={`/products/${handle}`}>
      <div className="col-sm-6 col-md-4 col-lg-3 mb-4 hover:cursor-pointer">
        <div className="product-item">
          <div className="product_image_wrap">
            <Thumbnail
              thumbnail={thumbnail}
              size="full"
              price={price}
              hoverable
              // buynow={buynow}
            />
          </div>
          <div className="product-content">
            <h3 className="product-item-titles">{title}</h3>
            {review.score > 0 && (
              <span className="flex items-center gap-x-1 text-sm align-top">
                <span className="font-bold font-sans text-xs mr-1 pt-1">
                  {review.score.toFixed(1)}
                </span>
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className={clsx(
                      i <= Math.round(review.score)
                        ? "text-yellow-500"
                        : "text-gray-500"
                    )}
                  >
                    ★
                  </span>
                ))}
                <span className="text-sm text-gray-500">({review.amount})</span>
              </span>
            )}
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
    </Link>
  )
}

export default ProductPreview
