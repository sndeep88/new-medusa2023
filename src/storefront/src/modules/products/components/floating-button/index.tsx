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
    <div className="fixed left-0 bottom-0 z-10 w-full hidden md:block">
      <div className="bg-checkout relative px-5 py-3 flex items-center gap-x-5 shadow-floating">
        <div className="w-24 flex items-center relative aspect-square">
          <Image
            src={product.thumbnail ?? ""}
            layout="fill"
            objectFit="cover"
            priority={true}
            className="absolute inset-0"
            alt={`Product image`}
          />
        </div>
        <div className="flex-1 flex items-center">
          <h4 className="font-bold text-sm md:text-base lg:text-xl">
            {product.title}
          </h4>
        </div>
        <div className="ml-auto h-full">
          {selectedPrice ? (
            <div className="flex items-center">
              <span className="text-2xl font-bold text-red-500">
                {selectedPrice.calculated_price}
              </span>
              {selectedPrice.price_type === "sale" ? (
                <span className="ml-2 text-lg line-through text-gray-500">
                  {selectedPrice.original_price}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="ml-5">
          <Button
            variant="primary"
            onClick={buynow}
            className="!py-3 !px-8 !rounded !text-lg"
          >
            Buy now
          </Button>
        </div>
      </div>
    </div>
  )
}
