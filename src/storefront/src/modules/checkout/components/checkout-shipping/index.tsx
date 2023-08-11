import Button from "@modules/common/components/button"
import Spinner from "@modules/common/icons/spinner"
import { Controller, useForm } from "react-hook-form"
import { formatAmount, useCart, useCartShippingOptions } from "medusa-react"
import { Cart } from "@medusajs/medusa"
import { RadioGroup } from "@headlessui/react"
import { useEffect, useMemo } from "react"
import clsx from "clsx"

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
    console.log(`value: ${Boolean(shipping_options && cart?.region)}`)
    if (shipping_options && cart?.region) {
      console.log({ shipping_options })
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

  return (
    <div>
      <div className="my-5">
        <h4 className="text-xl tracking-wider">Shipping Method</h4>

        <div className="mt-3">
          <Controller
            name="soId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
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
                            className={clsx(
                              "border rounded-md px-3 py-3 mb-3 text-gray-900",
                              {
                                "bg-blue-100 border border-blue-500 ":
                                  value === option.value,
                              },
                              {
                                "border-gray-300": value !== option.value,
                              }
                            )}
                          >
                            <div className="flex justify-between items-center">
                              <span>{option.label}</span>
                              <span>{option.price}</span>
                            </div>
                          </RadioGroup.Option>
                        )
                      })
                    : null}
                </RadioGroup>
              </div>
            )}
          />
        </div>

        <div className="mt-1">
          <span className="text-red-500 text-sm italic">{errors.soId}</span>
        </div>
      </div>

      {/* <div className="flex items-center justify-between mt-4">
        <span
          onClick={onBack}
          className="return-link text-blue-500 hover:cursor-pointer"
        >
          Return to information
        </span>

        <Button
          variant="secondary"
          className="ml-auto"
          onClick={onNext}
          disabled={!isValid || cart.shipping_methods?.length === 0}
        >
          Continue to payment
        </Button>
      </div> */}
    </div>
  )
}
export default CheckoutShipping
