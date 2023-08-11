import { medusaClient } from "@lib/config"
import CartItems from "@modules/checkout/components/cart-items"
import Button from "@modules/common/components/button"
import CartTotals from "@modules/common/components/cart-totals"
import Trash from "@modules/common/icons/trash"
import { useMutation } from "@tanstack/react-query"

import { formatAmount, useCart, useUpdateCart } from "medusa-react"
import { useMemo } from "react"
import { useForm } from "react-hook-form"

type DiscountFormValues = {
  discount_code: string
}

const CheckoutSummary = () => {
  const { cart } = useCart()
  const { id, discounts, region } = cart!
  const { mutate, isLoading } = useUpdateCart(id)
  const { setCart } = useCart()

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

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<DiscountFormValues>({
    mode: "onSubmit",
  })

  const onSubmit = (data: DiscountFormValues) => {
    mutate(
      {
        discounts: [{ code: data.discount_code }],
      },
      {
        onSuccess: ({ cart }) => setCart(cart),
        onError: () => {
          setError(
            "discount_code",
            {
              message: "Code is invalid",
            },
            {
              shouldFocus: true,
            }
          )
        },
      }
    )
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
    <div className="w-full px-3 sm:px-5 md:px-10">
      {/* items */}
      <CartItems items={cart.items} region={cart.region} />

      <div className="mt-4">
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
            className="flex h-full items-center justify-stretch gap-x-3"
          >
            <div className="flex-1">
              <input
                placeholder="Discount Code"
                className="px-3 py-[10px] rounded-md border border-gray-200 bg-white flex-1 w-full"
                {...register("discount_code")}
              />
              <span className="mt-1">
                {errors && errors.discount_code && (
                  <span className="text-red-500 text xs italic">
                    {errors.discount_code.message}
                  </span>
                )}
              </span>
            </div>

            <Button type="submit" variant="light">
              Apply
            </Button>
          </form>
        )}
      </div>

      <div className="mt-3">
        <CartTotals cart={cart} />
      </div>
    </div>
  )
}
export default CheckoutSummary
