import { CheckoutFormValues, useCheckout } from "@lib/context/checkout-context"
import ConnectForm from "@modules/common/components/connect-form"
import Input from "@modules/common/components/input"
import CountrySelect from "../country-select/index-old"
import { Controller } from "react-hook-form"
import Select from "@modules/common/components/select"
import { useRegions } from "medusa-react"
import { useMemo } from "react"

const BillingAddress = () => {
  const { regions } = useRegions()
  const { cart, setValue } = useCheckout()

  const countryOptions = useMemo(() => {
    const currentRegion = regions?.find((r) => r.id === cart?.region_id)

    if (!currentRegion) {
      return []
    }

    return currentRegion.countries.map((country) => ({
      value: country.iso_2,
      label: country.display_name,
    }))
  }, [regions, cart])

  return (
    <ConnectForm<CheckoutFormValues>>
      {({ register, control, formState: { errors, touchedFields } }) => (
        <div className="row mt-3">
          {/* country */}
          <div className="col-md-12 mb-2">
            <div className="relative z-0 w-full text-base">
              {/* <CountrySelect
                      name="shipping_address.country_code"
                      // value={value}
                      // onChange={(country) => onChange(country.value)}
                    />

                    <label
                      htmlFor="country"
                      className="absolute text-xs text-gray-500 duration-300 transform -translate-y-1/2 top-1 z-10 origin-[0] bg-white px-2 left-2"
                    >
                      Country/Region
                    </label> */}
              <Controller
                control={control}
                name="shipping_address.country_code"
                render={({ field }) => (
                  <Select
                    {...field}
                    options={countryOptions}
                    label="Country/Region"
                  />
                )}
              />
            </div>
          </div>
          {/* firstname */}
          <div className="col-md-6 mb-2">
            <Input
              label="First Name"
              {...register("shipping_address.first_name", {
                required: "First name is required",
              })}
              autoComplete="given-name"
            />
          </div>
          {/* lastname */}
          <div className="col-md-6 mb-2">
            <Input
              label="Last Name"
              {...register("shipping_address.last_name", {
                required: "Last name is required",
              })}
              autoComplete="family-name"
            />
          </div>
          {/* company */}
          <div className="col-md-12 mb-2">
            <Input
              label="Company (optional)"
              {...register("shipping_address.company")}
            />
          </div>
          {/* address */}
          <div className="col-md-12 mb-2">
            <Input
              label="Address"
              {...register("shipping_address.address_1", {
                required: "Address is required",
              })}
              autoComplete="address-line1"
            />
          </div>
          {/* apartment */}
          <div className="col-md-12 mb-2">
            <Input
              label="Apartment, suite, etc. (optional)"
              {...register("shipping_address.address_2")}
              autoComplete="address-line2"
            />
          </div>
          {/* postalCode */}
          <div className="col-md-6 mb-2">
            <Input
              label="Postal code"
              {...register("shipping_address.postal_code", {
                required: "Postal code is required",
              })}
              autoComplete="postal-code"
            />
          </div>
          {/* city */}
          <div className="col-md-6 mb-2">
            <Input
              label="City"
              {...register("shipping_address.city", {
                required: "City is required",
              })}
            />
          </div>
          {/* phone */}
          <div className="col-md-12 mb-2">
            <Input label="Phone" {...register("shipping_address.phone")} />
          </div>
        </div>
      )}
    </ConnectForm>
  )
}

export default BillingAddress
