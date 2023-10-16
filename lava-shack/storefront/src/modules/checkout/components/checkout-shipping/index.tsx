import Button from "@modules/common/components/button"
import Spinner from "@modules/common/icons/spinner"
import { Controller, useForm } from "react-hook-form"
import { formatAmount, useCart, useCartShippingOptions } from "medusa-react"
import { Cart } from "@medusajs/medusa"
import { RadioGroup } from "@headlessui/react"
import { Fragment, useEffect, useMemo } from "react"
import clsx from "clsx"
import Radio from "@modules/common/components/radio"

type ShippingOption = {
  value: string
  label: string
  price: string
}

type ShippingFormProps = {
  soId: string
}

const CheckoutShipping = ({
  cart,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}) => {
  const { addShippingMethod, setCart } = useCart()
  const {
    control,
    setError,
    formState: { errors },
    setValue,
  } = useForm<ShippingFormProps>({
    defaultValues: {
      soId: cart.shipping_methods?.[0]?.shipping_option_id,
    },
  })

  // Fetch shipping options
  const { shipping_options, refetch } = useCartShippingOptions(cart.id, {
    enabled: !!cart.id,
  })

  useEffect(() => {
    const refetchShipping = async () => {
      await refetch()
    }

    refetchShipping()
  }, [cart, refetch])

  const submitShippingOption = (soId: string) => {
    addShippingMethod.mutate(
      { option_id: soId },
      {
        // onSuccess: ({ cart }) => setCart(cart),
        onError: () =>
          setError(
            "soId",
            {
              type: "validate",
              message:
                "An error occurred while adding shipping. Please try again.",
            },
            { shouldFocus: true }
          ),
      }
    )
  }

  const handleChange = (value: string, fn: (value: string) => void) => {
    submitShippingOption(value)
    fn(value)
  }

  // Memoized shipping method options
  const shippingMethods: ShippingOption[] = useMemo(() => {
    // console.log(shipping_options)
    // console.log(`value: ${Boolean(shipping_options && cart?.region)}`)
    if (shipping_options && cart?.region) {
      // console.log({ shipping_options })
      return shipping_options?.map((option) => ({
        value: option.id,
        label: option.name,
        price: formatAmount({
          amount: option.amount || 0,
          region: cart.region,
        }),
      }))
    }

    return []
  }, [shipping_options, cart])

  useEffect(() => {
    if (!shippingMethods || !shippingMethods.length) return
    if (cart.shipping_methods && cart.shipping_methods.length) return

    const soId = shippingMethods[0].value
    handleChange(soId, (value) => {
      setValue("soId", value)
    })
  }, [shippingMethods])

  return (
    <div className="shipping pt-3 pb-4">
      <h5>Shipping Method</h5>

      <Controller
        name="soId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <RadioGroup
              value={value}
              onChange={(value: string) => handleChange(value, onChange)}
            >
              {shippingMethods && shippingMethods.length
                ? shippingMethods.map((option) => {
                    return (
                      <RadioGroup.Option
                        key={option.value}
                        value={option.value}
                        className={clsx("pay-item mt-2 mb-4")}
                      >
                        {({ checked }) => (
                          <div
                            className={clsx(
                              "w-full pay_label inline-flex items-center relative",
                              {
                                active: checked,
                              }
                            )}
                          >
                            <span className="absolute w-10 top-1/2 left-4 -translate-y-1/2">
                              <Radio checked={checked} />
                            </span>
                            <label className="flex-1 d-flex align-items-center justify-content-between">
                              <div>{option.label}</div>
                              <div>{option.price}</div>
                            </label>
                          </div>
                        )}
                      </RadioGroup.Option>
                    )
                  })
                : null}
            </RadioGroup>
          </>
        )}
      />

      <div className="mt-1">
        <span className="text-red-500 text-sm italic">{errors.soId}</span>
      </div>

      <div className="shipping w-100 mb-2 mt-4">
        <h5>Additional Information (Optional)</h5>
        <div className="input mt-2 no-placeholder">
          <input type="text" className="form-control" />
        </div>
      </div>
    </div>
  )
}
export default CheckoutShipping
