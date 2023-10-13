import { useEffect, useMemo, useState } from "react"
import SystemConfig, { ProviderType } from "../types"
import _, { get } from "lodash"
import Section from "../../../components/organisms/section"
import EditIcon from "../../../components/fundamentals/icons/edit-icon"
import EditModal from "./edit-modal"
import KeyIcon from "../../../components/fundamentals/icons/key-icon"
import clsx from "clsx"
import Actionables from "../../../components/molecules/actionables"
import useToggleState from "../../../hooks/use-toggle-state"

type Props = {
  configs: SystemConfig[]
}

const provider_details = {
  [ProviderType.MPAY]: {
    title: "MPay",
    description: "",
    showDetails: true,
  },
  [ProviderType.STRIPE]: {
    title: "Stripe",
    description: "",
    showDetails: false,
  },
  [ProviderType.SQUARE]: {
    title: "Square",
    description: "",
    showDetails: false,
  },
  [ProviderType.MAILGUN]: {
    title: "Mailgun",
    description: "",
    showDetails: true,
  },
  [ProviderType.TEXTGRID]: {
    title: "Textgrid",
    description: "",
    showDetails: true,
  },
  [ProviderType.GOOGLE]: {
    title: "GoogleApi",
    description: "",
    showDetails: true,
  },
  [ProviderType.DUMMY]: {
    title: "Dummy Tracking",
    description: "",
    showDetails: true,
  },
}

const whiteList: Record<ProviderType, string[]> = {
  [ProviderType.MPAY]: [
    "privateKey",
    "publicKey",
    "connection-token",
    "implementDirect",
  ],
  [ProviderType.STRIPE]: ["secretKey", "publicKey"],
  [ProviderType.SQUARE]: ["environment", "accessToken", "applicationId"],
  [ProviderType.MAILGUN]: [
    "private-apiKey",
    "public-apiKey",
    "webhook-key",
    "domain",
  ],
  [ProviderType.TEXTGRID]: [
    "service-host",
    "fromNumber",
    "accountSID",
    "authToken",
    "webhook-secret",
  ],
  [ProviderType.GOOGLE]: ["api-key"],
  [ProviderType.MEDUSA]: [],
  [ProviderType.DUMMY]: [
    "showTrackingUrl",
    "enableTrackingPage",
    "contactEmail",
    "contactPhone",
  ],
}

function EditConfig({ configs }: Props) {
  const providers = useMemo(() => {
    var providers = _.groupBy(configs, "provider")
    return _.fromPairs(
      _.sortBy(_.toPairs(providers), (p) => {
        return p[1][0].created_at
      }).reverse()
    )
  }, [configs])

  return (
    <div className="flex flex-col gap-y-xsmall">
      {Object.keys(providers).map((provider) => {
        const config = _.sortBy(providers[provider], "created_at").filter(
          (cfg) => whiteList[provider].some((k) => cfg.key.includes(k))
        )
        if (!provider_details[provider].showDetails) return null
        return (
          <ConfigSection
            key={provider}
            provider={provider as ProviderType}
            provider_detail={provider_details[provider]}
            config={config}
          />
        )
      })}
    </div>
  )
}

function ConfigSection({
  provider,
  provider_detail,
  config,
}: {
  provider: ProviderType
  provider_detail: { title: string; description: string; showDetail: boolean }
  config: SystemConfig[]
}) {
  const { state, toggle, close } = useToggleState()

  // console.log({ config})

  return (
    <Section
      title={provider_detail.title}
      forceDropdown={true}
      actions={[
        {
          label: "Edit",
          onClick: toggle,
          icon: <EditIcon size={20} />,
        },
      ]}
    >
      <div className="flex flex-col gap-y-large">
        <p className="inter-base-regular text-grey-50">
          {provider_details[provider].description}
        </p>
        <div className="flex flex-col gap-y-small">
          {config.map((option) => {
            return <ConfigCard key={option.id} option={option} />
          })}
        </div>
      </div>

      <EditModal
        configs={config}
        open={state}
        onClose={close}
        title={`Update ${provider_detail.title} Config`}
        provider={provider}
      />
    </Section>
  )
}

function ConfigCard({ option }: any) {
  const { description, key_name } = useMemo(() => {
    switch (option.type) {
      case "payment":
        if (
          option.provider === ProviderType.MPAY &&
          option.dataType === "boolean"
        ) {
          return {
            description:
              option.value === "true"
                ? "Direct Card Mode enable"
                : "Inline Payment Mode enable",
            key_name: "MPay Mode",
          }
        }
        return {
          description: option.key_description,
          key_name: option.key_name,
        }
      default:
        return {
          description: option.key_description,
          key_name: option.key_name,
        }
    }
  }, [option])

  return (
    <>
      <div className="flex items-center justify-between rounded-rounded border border-grey-20 bg-grey-0 p-base">
        <div className="flex items-center gap-x-base">
          <div className="flex h-10 w-10 items-center justify-center rounded-rounded bg-grey-10 p-2.5">
            <KeyIcon size={20} className="text-grey-50" />
          </div>
          <div>
            <p className="inter-base-semibold">{key_name}</p>
            <div>
              <p className="inter-small-regular text-grey-50">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditConfig
