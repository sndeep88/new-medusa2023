import { Product, SalesChannel } from "@medusajs/medusa"
import React, { useMemo } from "react"
import Badge from "../../../../../components/fundamentals/badge"
import FeatureToggle from "../../../../../components/fundamentals/feature-toggle"
import ChannelsIcon from "../../../../../components/fundamentals/icons/channels-icon"
import EditIcon from "../../../../../components/fundamentals/icons/edit-icon"
import TrashIcon from "../../../../../components/fundamentals/icons/trash-icon"
import { ActionType } from "../../../../../components/molecules/actionables"
import SalesChannelsDisplay from "../../../../../components/molecules/sales-channels-display"
import StatusSelector from "../../../../../components/molecules/status-selector"
import Section from "../../../../../components/organisms/section"
import { useFeatureFlag } from "../../../../../context/feature-flag"
import useToggleState from "../../../../../hooks/use-toggle-state"
import useEditProductActions from "../../hooks/use-edit-product-actions"
import ChannelsModal from "./channels-modal"
import GeneralModal from "./general-modal"
import PublishIcon from "../../../../../components/fundamentals/icons/publish-icon"
import { useAdminCustomQuery } from "medusa-react"

type Props = {
  product: Product
}

const GeneralSection = ({ product }: Props) => {
  const { onDelete, onStatusChange } = useEditProductActions(product.id)
  const { data } = useAdminCustomQuery("/extend-store", ["extend-store"])
  const storeUrl = useMemo(() => data?.extendStore.storeUrl ?? "", [data])

  const {
    state: infoState,
    close: closeInfo,
    toggle: toggleInfo,
  } = useToggleState()

  const {
    state: channelsState,
    close: closeChannels,
    toggle: toggleChannels,
  } = useToggleState(false)

  const { isFeatureEnabled } = useFeatureFlag()

  const actions: ActionType[] = [
    {
      label: "Edit General Information",
      onClick: toggleInfo,
      icon: <EditIcon size={20} />,
    },
    {
      label: "Delete",
      onClick: onDelete,
      variant: "danger",
      icon: <TrashIcon size={20} />,
    },
  ]

  if (isFeatureEnabled("sales_channels")) {
    actions.splice(1, 0, {
      label: "Edit Sales Channels",
      onClick: toggleChannels,
      icon: <ChannelsIcon size={20} />,
    })
  }

  return (
    <>
      <Section
        title={product.title}
        actions={actions}
        forceDropdown
        status={
          <>
            <StatusSelector
              isDraft={product?.status === "draft"}
              activeState="Published"
              draftState="Draft"
              onChange={() => onStatusChange(product.status)}
            />
            <a
              target="_blank"
              href={`${storeUrl}/products/${product.handle}`}
              title="Open product store"
            >
              <PublishIcon size={20} />
            </a>
          </>
        }
      >
        <p className="inter-base-regular mt-2 whitespace-pre-wrap text-grey-50">
          {product.description}
        </p>
        <ProductTags product={product} />
        <ProductDetails product={product} />
        <ProductSalesChannels product={product} />
      </Section>

      <GeneralModal product={product} open={infoState} onClose={closeInfo} />

      <FeatureToggle featureFlag="sales_channels">
        <ChannelsModal
          product={product}
          open={channelsState}
          onClose={closeChannels}
        />
      </FeatureToggle>
    </>
  )
}

type DetailProps = {
  title: string
  value?: string | null
}

const Detail = ({ title, value }: DetailProps) => {
  return (
    <div className="inter-base-regular flex items-center justify-between text-grey-50">
      <p>{title}</p>
      <p>{value ? value : "–"}</p>
    </div>
  )
}

const ProductDetails = ({ product }: Props) => {
  return (
    <div className="mt-8 flex flex-col gap-y-3">
      <h2 className="inter-base-semibold">Details</h2>
      <Detail title="Subtitle" value={product.subtitle} />
      <Detail title="Handle" value={product.handle} />
      <Detail title="Type" value={product.type?.value} />
      <Detail title="Collection" value={product.collection?.title} />
      <Detail
        title="Discountable"
        value={product.discountable ? "True" : "False"}
      />
    </div>
  )
}

const ProductTags = ({ product }: Props) => {
  if (product.tags?.length === 0) {
    return null
  }

  return (
    <ul className="mt-4 flex flex-wrap items-center gap-1">
      {product.tags.map((t) => (
        <li key={t.id}>
          <div className="inter-small-semibold rounded-rounded bg-grey-10 px-3 py-[6px] text-grey-50">
            {t.value}
          </div>
        </li>
      ))}
    </ul>
  )
}

type SalesChannelBadgeProps = {
  channel: SalesChannel
}

const SalesChannelBadge: React.FC<SalesChannelBadgeProps> = ({ channel }) => {
  return (
    <Badge variant="ghost" className="px-3 py-1.5">
      <div className="flex items-center">
        <span className="inter-small-regular text-grey-90">{channel.name}</span>
      </div>
    </Badge>
  )
}

const ProductSalesChannels = ({ product }: Props) => {
  return (
    <FeatureToggle featureFlag="sales_channels">
      <div className="mt-xlarge">
        <h2 className="inter-base-semibold mb-xsmall">Sales channels</h2>
        <SalesChannelsDisplay channels={product.sales_channels} />
      </div>
    </FeatureToggle>
  )
}

export default GeneralSection
