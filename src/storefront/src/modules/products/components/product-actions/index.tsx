import { useProductActions } from "@lib/context/product-context"
import { useStore } from "@lib/context/store-context"
import useProductPrice from "@lib/hooks/use-product-price"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/option-select"
import { useRouter } from "next/router"
import React, { useEffect, useMemo, useState } from "react"
import { Product } from "types/medusa"
import ProductBreadcrumb from "../product-breadcrumb"
import ProductVisited from "../product-visited"
import ProductSold from "../product-sold"
import ProductStock from "../product-stock"
import Quantity from "../product-quantity"
import FreeShippingIcon from "@modules/common/icons/free-shipping"
import { IconProps } from "types/icon"
import SecurePaymentIcon from "@modules/common/icons/secure-payment"
import FreeReturnIcon from "@modules/common/icons/free-return"
import CarbonNeutalIcon from "@modules/common/icons/carbon-neutral"
import FlashSale from "../flash-sale"

type ProductActionsProps = {
  product: Product
}

const sellInfo: {
  icon: React.FC<IconProps>
  label: string
}[] = [
  {
    icon: FreeShippingIcon,
    label: "Free worldwide shipping",
  },
  {
    icon: FreeReturnIcon,
    label: "Free returns",
  },
  {
    icon: CarbonNeutalIcon,
    label: "Carbon neutral",
  },
  {
    icon: SecurePaymentIcon,
    label: "Secure payments",
  },
]

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const { updateOptions, addToCart, options, inStock, variant } =
    useProductActions()

  const price = useProductPrice({ id: product.id, variantId: variant?.id })

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  // useEffect(() => {
  //   console.log({ selectedPrice })
  // }, [selectedPrice])

  const { createBuynowCart } = useStore()
  const router = useRouter()

  const buynow = async () => {
    if (!variant) return

    await createBuynowCart()
    addToCart()

    router.push("/checkout")
  }

  const visited = useMemo(() => {
    return Math.floor(Math.random() * 100)
  }, [])
  const sold = useMemo(() => {
    return Math.floor(Math.random() * 1000)
  }, [])

  return (
    <div className="flex flex-col gap-y-2">
      {/* {product.collection && (
        <Link href={`/collections/${product.collection.id}`}>
          <a className="text-small-regular text-gray-700">
            {product.collection.title}
          </a>
        </Link>
      )} */}

      <ProductBreadcrumb productName={product.title} />

      <ProductVisited visited={visited} />

      <h3 className="text-xl-regular">{product.title}</h3>

      <ProductSold sold={sold} />

      {selectedPrice ? (
        <div className="flex items-center mt-2">
          {selectedPrice.percentage_diff !== "0" ? (
            <span className="badge bg-secondary font-bold text-white py-0.5 px-3 mr-2 ">
              Save {selectedPrice.percentage_diff}%
            </span>
          ) : null}
          <span className="product-price">
            {selectedPrice.calculated_price}
          </span>
          {selectedPrice.price_type === "sale" ? (
            <span className="ml-2 line-through text-gray-500">
              {selectedPrice.original_price}
            </span>
          ) : null}
        </div>
      ) : null}

      {/* flash-sale */}
      <FlashSale />

      {product.variants.length > 1 && (
        <div className="my-8 flex flex-col gap-y-6">
          {product.options.map((option) => {
            return (
              <div key={option.id}>
                <OptionSelect
                  option={option}
                  current={options[option.id]}
                  updateOption={updateOptions}
                  title={option.title}
                />
              </div>
            )
          })}
        </div>
      )}

      <div className="my-3">
        <h4 className="mb-2 text-xl tracking-wide">Quantity</h4>

        <Quantity />
      </div>

      <div className="flex flex-col gap-y-3 mb-2">
        {sellInfo.map(({ icon: Icon, label }, idx) => (
          <div className="flex items-center gap-x-3" key={idx}>
            <Icon />
            <span className=" text-gray-900">{label}</span>
          </div>
        ))}
      </div>

      <ProductStock />

      <div className="flex flex-col gap-y-5 mt-3">
        {/* <Button onClick={addToCart}>
          {!inStock ? "Out of stock" : "Add to cart"}
        </Button> */}
        <Button variant="secondary" onClick={buynow}>
          Buy now
        </Button>
      </div>

      <div className="product-desctiption pt-4">{product.description}</div>
    </div>
  )
}

export default ProductActions
