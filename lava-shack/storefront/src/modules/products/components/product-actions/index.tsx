import { useProductActions } from "@lib/context/product-context"
import { useStore } from "@lib/context/store-context"
import useProductPrice from "@lib/hooks/use-product-price"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/option-select"
import { useRouter } from "next/router"
import React, { useEffect, useMemo, useRef, useState } from "react"
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
import FloatingButton from "../floating-button"
import ProductDesc from "../product-description"
import { trackEvent } from "@lib/pixel"
import { medusaClient } from "@lib/config"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"

type ProductActionsProps = {
  product: Product
  prodDesc: any
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

async function getReviewScore(productId: string) {
  return medusaClient.client.request(
    "GET",
    `/store/product-reviews/${productId}/score`
  )
}

const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  prodDesc,
}) => {
  const { updateOptions, addToCart, options, inStock, variant } =
    useProductActions()

  const { data } = useQuery(
    ["product-reviews", product?.id, "score"],
    () => getReviewScore(product?.id ?? ""),
    { enabled: !!product?.id }
  )
  const { score, amount } = data?.score ?? { score: 0, amount: 0 }

  const price = useProductPrice({ id: product.id, variantId: variant?.id })

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const { createBuynowCart } = useStore()
  const router = useRouter()

  const buynow = async () => {
    trackEvent("Checkout", { product_id: product.id, variant_id: variant?.id })
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

  const buynowRef = useRef<HTMLButtonElement | null>(null)

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const listener = function () {
      if (buynowRef.current) {
        const { bottom } = buynowRef.current.getBoundingClientRect()

        if (bottom < 100) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      }
    }

    window.addEventListener("scroll", listener)

    return () => {
      window.removeEventListener("scroll", listener)
    }
  }, [buynowRef.current])

  return (
    <div className="product-detail-content">
      {/* {product.collection && (
        <Link href={`/collections/${product.collection.id}`}>
          <a className="text-small-regular text-gray-700">
            {product.collection.title}
          </a>
        </Link>
      )} */}

      <ProductBreadcrumb productName={product.title} />

      {/* <ProductVisited visited={visited} /> */}

      <h2 className="section-title text-start mb-2">{product.title}</h2>

      {score > 0 ? (
        <div
          className="w-full flex items-center gap-x-3 mb-2 align-middle hover:cursor-pointer"
          onClick={() => {
            const element = document.getElementById("review")
            if (element) {
              element.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start",
              })
            }
          }}
        >
          <span className="flex items-center gap-x-1 text-base align-top">
            <span className="font-bold font-sans text-sm mr-1 pt-1">
              {score.toFixed("1")}
            </span>
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={clsx(
                  i <= Math.round(score) ? "text-yellow-500" : "text-gray-500"
                )}
              >
                ★
              </span>
            ))}
          </span>
          <span className="text-sm text-gray-500">({amount})</span>
        </div>
      ) : null}

      <ProductSold sold={sold} />

      {selectedPrice ? (
        <div className="product-item-price pt-2">
          {selectedPrice.percentage_diff !== "0" ? (
            <span className="badge bg-secondary me-2">
              Save {selectedPrice.diff_amount}
            </span>
          ) : null}
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

      {/* flash-sale */}
      <FlashSale />

      {product.variants.length > 1 && (
        <div className="varients">
          {product.options.map((option) => {
            return (
              <div key={option.id} className="varient pt-4">
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

      <div id="field1" className="mt-4">
        <h5 className="prod-lable">Quantity</h5>
        <Quantity />
      </div>

      <div className="product-sell-info shopline-element-sell-info pt-4">
        {sellInfo.map(({ icon: Icon, label }, idx) => (
          <div className="product-sell-box" key={idx}>
            <div className="product-sell-icon">
              <Icon size={24} />
            </div>
            <div className=" product-sell-text body3">{label}</div>
          </div>
        ))}
      </div>

      <ProductStock />

      <div className="text-center mt-2 mt-md-4">
        <button
          onClick={buynow}
          ref={buynowRef}
          className="btn btn-black hover:bg-black hover:text-white w-100"
        >
          Buy now
        </button>
      </div>

      <div className="product-description pt-3">
        <ProductDesc prodDesc={prodDesc} product={product} />
      </div>

      {visible && <FloatingButton product={product} />}
    </div>
  )
}

export default ProductActions
