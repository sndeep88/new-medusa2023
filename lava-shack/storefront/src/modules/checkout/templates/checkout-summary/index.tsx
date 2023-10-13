import { medusaClient } from "@lib/config"
import { useCheckout } from "@lib/context/checkout-context"
import CartItems from "@modules/checkout/components/cart-items"
import Button from "@modules/common/components/button"
import CartTotals from "@modules/common/components/cart-totals"
import Input from "@modules/common/components/input"
import Trash from "@modules/common/icons/trash"
import { useMutation } from "@tanstack/react-query"

import { formatAmount, useCart, useUpdateCart } from "medusa-react"
import { useMemo } from "react"
import { useForm } from "react-hook-form"

type DiscountFormValues = {
  discount_code: string
}

const CheckoutSummary = () => {
  // const { cart } = useCart()
  // const { setCart } = useCart()
  const { cart, updateDiscount, setCart, isLoading } = useCheckout()
  const { id, discounts, region } = cart!

  const { isLoading: mutationLoading, mutate: removeDiscount } = useMutation(
    (payload: { cartId: string; code: string }) => {
      return medusaClient.carts.deleteDiscount(payload.cartId, payload.code)
    }
  )

  const appliedDiscount = useMemo(() => {
    if (!discounts || !discounts.length) {
      return undefined
    }

    switch (discounts[0].rule.type) {
      case "percentage":
        return `${discounts[0].rule.value}%`
      case "fixed":
        return `- ${formatAmount({
          amount: discounts[0].rule.value,
          region: region,
        })}`

      default:
        return "Free shipping"
    }
  }, [discounts, region])

  const { register, handleSubmit, setError, formState } =
    useForm<DiscountFormValues>({
      mode: "onSubmit",
    })

  const { isDirty, isValid, errors } = formState
  const onSubmit = (data: DiscountFormValues) => {
    updateDiscount(data)
  }

  const onRemove = () => {
    removeDiscount(
      { cartId: id, code: discounts[0].code },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
        },
      }
    )
  }

  if (!cart?.id) {
    return null
  }

  return (
    <div className="checkout-detail right-box-pd">
      {/* items */}
      <div className="product-lists">
        <CartItems items={cart.items} region={cart.region} />

        <>
          {appliedDiscount ? (
            <div className="flex items-center justify-between">
              <div>
                <span>Code: </span>
                <span className="font-semibold">{appliedDiscount}</span>
              </div>
              <div>
                <button
                  className="flex items-center gap-x-2"
                  onClick={onRemove}
                  disabled={isLoading}
                >
                  <Trash size={16} />
                  <span className="sr-only">Remove gift card from order</span>
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="coupon-form form-group d-flex mb-4"
            >
              <input
                placeholder="Discount Code"
                {...register("discount_code", { required: "Required" })}
                className="form-control me-2"
              />

              <button
                type="submit"
                className="btn btn-sm btn-default"
                disabled={!isDirty || !isValid || isLoading}
              >
                Apply
              </button>
            </form>
          )}
        </>

        <div className="pay">
          <CartTotals cart={cart} />
        </div>

        <img
          src="/assets/images/plugin_settle_info_default.png"
          alt="why choose"
          className="mt-4"
        />
      </div>
    </div>
  )
}
export default CheckoutSummary
