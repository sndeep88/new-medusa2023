import Button from "@modules/common/components/button"

import ConnectForm from "@modules/common/components/connect-form"
import { CheckoutFormValues, useCheckout } from "@lib/context/checkout-context"
import { emailRegex } from "@lib/util/regex"
import CountrySelect from "../country-select"

const CheckoutInfo = () => {
  return (
    <div className="flex flex-col items-center">
      <ConnectForm<CheckoutFormValues>>
        {({ register }) => (
          <div className="flex flex-col w-full">
            {/* contact */}
            <div className="w-full flex flex-col gap-y-2 relative">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="w-full rounded-md px-3 py-2 border border-gray-300"
                {...register("email", {
                  required: "Email is required",
                  pattern: emailRegex,
                })}
                autoComplete="email"
              />
            </div>
            <div className="w-full my-2 flex items-center gap-x-2">
              <input type="checkbox" name="saveEmail" id="saveEmail" />
              <span className="text-base">
                Receive news and offers via e-mail
              </span>
            </div>
            <div className="mt-2">
              <h4 className="text-lg font-medium">Shipping</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-x-3 items-center">
                {/* country */}
                <div className="flex flex-col items-start md:col-span-full">
                  <label htmlFor="country">Country/Region</label>
                  <div className="mt-1 w-full">
                    <CountrySelect
                      name="shipping_address.country_code"
                      // value={value}
                      // onChange={(country) => onChange(country.value)}
                    />
                  </div>
                </div>
                {/* firstname */}
                <div className="flex flex-col items-start">
                  <label htmlFor="firstName">First Name</label>
                  <div className="mt-1 w-full">
                    <input
                      type="text"
                      className="w-full rounded-md px-3 py-2 border border-gray-300"
                      {...register("shipping_address.first_name", {
                        required: "First name is required",
                      })}
                      autoComplete="given-name"
                    />
                  </div>
                </div>
                {/* lastname */}
                <div className="flex flex-col items-start">
                  <label htmlFor="lastName">Last Name</label>
                  <div className="mt-1 w-full">
                    <input
                      type="text"
                      {...register("shipping_address.last_name", {
                        required: "Last name is required",
                      })}
                      className="w-full rounded-md px-3 py-2 border border-gray-300"
                      autoComplete="family-name"
                    />
                  </div>
                </div>
                {/* company */}
                <div className="flex flex-col items-start md:col-span-full">
                  <label htmlFor="company">Company (optional)</label>
                  <div className="mt-1 w-full">
                    <input
                      type="text"
                      className="w-full rounded-md px-3 py-2 border border-gray-300"
                      {...register("shipping_address.company")}
                    />
                  </div>
                </div>
                {/* address */}
                <div className="flex flex-col items-start md:col-span-full">
                  <label htmlFor="address">Address</label>
                  <div className="mt-1 w-full">
                    <input
                      type="text"
                      className="w-full rounded-md px-3 py-2 border border-gray-300"
                      {...register("shipping_address.address_1", {
                        required: "Address is required",
                      })}
                      autoComplete="address-line1"
                    />
                  </div>
                </div>
                {/* apartment */}
                <div className="flex flex-col items-start md:col-span-full">
                  <label htmlFor="apartment">
                    Apartment, suite, etc. (optional)
                  </label>
                  <div className="mt-1 w-full">
                    <input
                      type="text"
                      {...register("shipping_address.address_2")}
                      autoComplete="address-line2"
                      className="w-full rounded-md px-3 py-2 border border-gray-300"
                    />
                  </div>
                </div>
                {/* postalCode */}
                <div className="flex flex-col items-start">
                  <label htmlFor="postalCode">Postal code</label>
                  <div className="mt-1 w-full">
                    <input
                      type="text"
                      {...register("shipping_address.postal_code", {
                        required: "Postal code is required",
                      })}
                      autoComplete="postal-code"
                      className="w-full rounded-md px-3 py-2 border border-gray-300"
                    />
                  </div>
                </div>
                {/* city */}
                <div className="flex flex-col items-start">
                  <label htmlFor="city">City</label>
                  <div className="mt-1 w-full">
                    <input
                      type="text"
                      {...register("shipping_address.city", {
                        required: "City is required",
                      })}
                      className="w-full rounded-md px-3 py-2 border border-gray-300"
                    />
                  </div>
                </div>
                {/* phone */}
                <div className="flex flex-col items-start md:col-span-full">
                  <label htmlFor="phone">Phone</label>
                  <div className="mt-1 w-full">
                    <input
                      type="text"
                      {...register("shipping_address.phone")}
                      className="w-full rounded-md px-3 py-2 border border-gray-300"
                    />
                  </div>
                </div>
                <div className="col-span-full w-full my-2 flex items-center gap-x-2">
                  <input type="checkbox" name="saveInfo" id="saveInfo" />
                  <span className="text-base">
                    Save my information and pay faster next time
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </ConnectForm>
      {/* <div className="flex w-full items-center justify-end mt-4">
        <Button
          variant="secondary"
          className="ml-auto"
          type="button"
          onClick={handleSubmit(setAddresses)}
          disabled={!isDirty || !isValid}
        >
          Continue to Shipping
        </Button>
      </div> */}
    </div>
  )
}
export default CheckoutInfo
