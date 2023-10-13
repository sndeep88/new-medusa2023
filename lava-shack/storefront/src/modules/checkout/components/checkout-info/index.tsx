import ConnectForm from "@modules/common/components/connect-form"
import { CheckoutFormValues, useCheckout } from "@lib/context/checkout-context"
import { emailRegex } from "@lib/util/regex"

import Input from "@modules/common/components/input"

import Select from "@modules/common/components/select"
import { Controller } from "react-hook-form"
import { useRegions } from "medusa-react"
import { useEffect, useMemo } from "react"
import AutoCompleteInput from "../autocomplete-input"

const CheckoutInfo = () => {
  const { regions } = useRegions()
  const { cart, setValue, getValues, apiKey } = useCheckout()

  const countryOptions = useMemo(() => {
    const currentRegion = regions?.find((r) => r.id === cart?.region_id)

    if (!currentRegion) {
      return []
    }

    return currentRegion.countries
      .sort((a, b) => a.id - b.id)
      .map((country) => ({
        value: country.iso_2,
        label: country.display_name,
      }))
  }, [regions])

  useEffect(() => {
    if (!getValues()?.shipping_address?.country_code) {
      const us = countryOptions?.find((c) => c.value === "us")
      console.log(us ?? countryOptions[0])
      setValue(
        "shipping_address.country_code",
        us?.value ?? countryOptions[0]?.value
      )
    }
  }, [countryOptions])

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
              autoComplete="email"
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
                  render={({ field: { ref: inputRef, ...fields } }) =>
                    apiKey ? (
                      <AutoCompleteInput
                        apiKey={apiKey}
                        fields={fields}
                        countryOptions={countryOptions}
                      />
                    ) : (
                      <Input label="Address" {...fields} ref={inputRef} />
                    )
                  }
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
