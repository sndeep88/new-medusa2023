import { ConfigType } from "../types"
import RadioGroup from "../../../components/organisms/radio-group"

type Props = {
  type: ConfigType
}

const TypeCard = ({ type }: Props) => {
  const getTypeLabel = (type: ConfigType) => {
    switch (type) {
      case ConfigType.Payment:
        return "Payment"
      case ConfigType.Email:
        return "Email"
      case ConfigType.Sms:
        return "Sms"
      case ConfigType.GoogleApi:
        return "Google Api"
      case ConfigType.Tracking:
        return "Tracking"
    }
  }

  return (
    <RadioGroup.Item value={type} label={getTypeLabel(type)}>
      <div className="inter-small-regular flex flex-col gap-y-2xsmall text-grey-50">
        {/* <p>
          Payment providers:{" "}
          <span className="truncate">
            {type.payment_providers?.length
              ? type.payment_providers
                  .map((pp) => paymentProvidersMapper(pp.id).label)
                  .join(", ")
              : "Not configured"}
          </span>
        </p>
        <p>
          Fulfillment providers:{" "}
          <span className="truncate">
            {type.fulfillment_providers?.length
              ? type.fulfillment_providers
                  .map((fp) => fulfillmentProvidersMapper(fp.id).label)
                  .join(", ")
              : "Not configured"}
          </span>
        </p> */}
      </div>
    </RadioGroup.Item>
  )
}

export default TypeCard
