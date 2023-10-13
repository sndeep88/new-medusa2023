import { CheckoutFormValues } from "@lib/context/checkout-context"
import Input from "@modules/common/components/input"
import { usePlacesWidget } from "react-google-autocomplete"
import { useFormContext } from "react-hook-form"

function AutoCompleteInput({ fields, apiKey, countryOptions }: any) {
  const { setValue, getValues } = useFormContext<CheckoutFormValues>()

  const { ref, autocompleteRef } = usePlacesWidget<HTMLInputElement>({
    apiKey: apiKey,
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

  return <Input label="Address" {...fields} ref={ref} />
}
export default AutoCompleteInput
