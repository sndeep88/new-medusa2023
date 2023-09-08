import { Product } from "types/medusa"
import Image from "next/image"
import { useProductActions } from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import { useMemo } from "react"
import { useStore } from "@lib/context/store-context"
import { useRouter } from "next/router"
import Button from "@modules/common/components/button"

export default function FloatingButton({ product }: { product: Product }) {
  const { variant, addToCart } = useProductActions()

  const price = useProductPrice({ id: product.id, variantId: variant?.id })

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const { createBuynowCart } = useStore()
  const router = useRouter()

  const buynow = async () => {
    if (!variant) return

    await createBuynowCart()
    addToCart()

    router.push("/checkout")
  }

  return (
    <div className="stickyBtn fixed bottom-0 inset-x-0">
      <div className="container-fluid ps-0 pe-0 ps-md-4 pe-md-4">
        <div className="row">
          <div className="col-6 col-lg-7 d-none d-md-block">
            <div className="d-flex align-items-center">
              <div className="me-3 thumbnail w-[68px] flex items-center relative aspect-square">
                <Image
                  src={product.thumbnail ?? ""}
                  layout="fill"
                  objectFit="cover"
                  priority={true}
                  className="absolute inset-0"
                  alt={`Product image`}
                />
              </div>

              <h4 className="m-0 text-truncate">{product.title}</h4>
            </div>
          </div>
          <div className="col-6 col-lg-5 text-end d-flex align-items-center justify-content-end">
            {selectedPrice ? (
              <div className="product-item-price  d-none d-md-block">
                <span className="product-price">
                  {selectedPrice.calculated_price}
                </span>
                {selectedPrice.price_type === "sale" ? (
                  <span className="line-through text-gray-500">
                    {selectedPrice.original_price}
                  </span>
                ) : null}
              </div>
            ) : null}
            <a onClick={buynow} className="btn btn-secondary ms-0 ms-md-3 rounded">
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
