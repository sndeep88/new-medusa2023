import Button from "@modules/common/components/button"

import ConnectForm from "@modules/common/components/connect-form"
import { CheckoutFormValues, useCheckout } from "@lib/context/checkout-context"
import { emailRegex } from "@lib/util/regex"
import CountrySelect from "../country-select"
import Input from "@modules/common/components/input"
import Link from "next/link"
import Select from "@modules/common/components/select"
import { Controller } from "react-hook-form"
import { useRegions } from "medusa-react"
import { useEffect, useMemo } from "react"
import { usePlacesWidget } from "react-google-autocomplete"
import { add } from "lodash"

const CheckoutInfo = () => {
  const { regions } = useRegions()
  const { cart, setValue, getValues } = useCheckout()

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

  useEffect(() => {
    if (!cart?.shipping_address?.country_code) {
      setValue("shipping_address.country_code", countryOptions[0]?.value)
    }
  }, [cart, countryOptions])

  const { ref, autocompleteRef } = usePlacesWidget<HTMLInputElement>({
    apiKey: process.env.NEXT_PUBLIC_GG_AUTOCOMPLETE_API,
    onPlaceSelected: (place) => {
      // console.log({ place })

      const address = place.address_components.find((p: any) =>
        p.types.includes("locality")
      )
      const city_1 = place.address_components.find((p: any) =>
        p.types.includes("administrative_area_level_1")
      )
      const city_2 = place.address_components.find((p: any) =>
        p.types.includes("administrative_area_level_2")
      )

      setValue("shipping_address.address_1", address?.long_name)
      setValue("shipping_address.city", city_1?.long_name ?? city_2?.long_name)
    },
    options: {
      componentRestrictions: {
        country:
          getValues().shipping_address?.country_code ??
          countryOptions[0]?.value,
      },
      bounces: 300,
    },
  })

  return (
    <ConnectForm<CheckoutFormValues>>
      {({ register, control }) => (
        <>
          <div className="contact">
            <div className="mb-3 d-flex  justify-content-between flex-column flex-md-row">
              <h5 className="m-0">Contact information</h5>
              <p className="m-0">
                Do you already have an account?{" "}
                <a href="#" className="text-blue-500">
                  Log in
                </a>
              </p>
            </div>

            <Input
              label={"Email"}
              {...register("email", {
                required: "Email is required",
                pattern: emailRegex,
              })}
            />

            <div className="form-check ps-0 pb-2">
              <input
                type="checkbox"
                name="customCheck"
                id="customCheck"
                className="custom-checkbox me-1"
              />
              <span>
                <label htmlFor="customCheck">
                  Subscribe to receive exclusive offers and order status updates
                </label>
              </span>
            </div>
          </div>

          <div className="shipping pt-4">
            {/* shipping */}
            <h5 className="mb-4 mt-0">Shipping address</h5>
            <div className="row">
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
                <Controller
                  control={control}
                  name="shipping_address.address_1"
                  render={({ field: { ref: inputRef, ...fields } }) => (
                    <Input label="Address" {...fields} ref={ref} />
                  )}
                />

                {/* <Input
                  label="Address"
                  {...register("shipping_address.address_1", {
                    required: "Address is required",
                  })}
                  autoComplete="address-line1"
                /> */}
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
          </div>
        </>
      )}
    </ConnectForm>
  )
}
export default CheckoutInfo
