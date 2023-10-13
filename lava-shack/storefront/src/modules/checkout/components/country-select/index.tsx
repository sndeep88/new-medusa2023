import { Combobox, Transition } from "@headlessui/react"
import { useCheckout } from "@lib/context/checkout-context"
import useCountryOptions from "@lib/hooks/use-country-options"
import clsx from "clsx"
import { useCart, useRegions } from "medusa-react"
import { Fragment, useEffect, useMemo, useState } from "react"
import { Controller } from "react-hook-form"

type Country = {
  label: string
  value: string
}

const CountrySelect = ({ name }: { name: string }) => {
  const { regions } = useRegions()
  const { cart } = useCart()

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

  const [query, setQuery] = useState("")

  const filteredCountries =
    query === ""
      ? countryOptions
      : countryOptions.filter((country) => {
          return country.label.toLowerCase().includes(query.toLowerCase())
        })

  const { control, setError, setValue, setFocus, formState, getFieldState } =
    useCheckout()

  const isValidCountry = (v: string) => {
    return !!countryOptions.find((c) => c.value === v)
  }

  // const { errors } = formState

  // const fieldState = getFieldState("shipping_address.country_code")

  // useEffect(() => {
  //   console.log({ fieldState })
  // }, [fieldState])

  const handleCountryChange = (country: string) => {
    const isValid = isValidCountry(country)
    console.log({ isValid })
    if (!isValidCountry(country)) {
      setError("shipping_address.country_code", {
        message: "Invalid country code",
        type: "onChange",
      })
    }

    setValue("shipping_address.country_code", country)
  }

  return (
    <Controller
      name="shipping_address.country_code"
      control={control}
      rules={{
        required: true,
        validate: {
          isValidCountry: (v) => isValidCountry(v) || "Invalid country code",
        },
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Combobox
          value={countryOptions.find((c) => c.value === value)}
          onChange={(value) => onChange(value.value)}
        >
          <div className="relative mt-1">
            <div className="relative w-full cursor-default  bg-white text-left">
              <Combobox.Input
                onChange={(event) => setQuery(event.target.value)}
                className={clsx(
                  "w-full rounded-md px-4 py-2 border border-gray-300 text-base-regular"
                )}
                displayValue={(country: any) => country?.label ?? query}
              />
              <div className="absolute inset-y-0 right-0"></div>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredCountries.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredCountries.map((country) => (
                    <Combobox.Option
                      key={country.value}
                      value={country}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-teal-600 text-white" : "text-gray-900"
                        }`
                      }
                    >
                      {({ selected }) => (
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {country.label}
                        </span>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
            {error && (
              <span className="text-red-500 text-xs mt-1 italic">
                *{error.message}
              </span>
            )}
          </div>
        </Combobox>
      )}
    />
  )
}

export default CountrySelect
