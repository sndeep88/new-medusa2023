import { type } from "@testing-library/user-event/dist/types/setup/directApi"
import Fade from "../../../components/atoms/fade-wrapper"
import PlusIcon from "../../../components/fundamentals/icons/plus-icon"
import { ActionType } from "../../../components/molecules/actionables"
import Breadcrumb from "../../../components/molecules/breadcrumb"
import BodyCard from "../../../components/organisms/body-card"
import useToggleState from "../../../hooks/use-toggle-state"
import PixelTable from "./pixel-table"
import useNotification from "../../../hooks/use-notification"
import { useState } from "react"
import { useAdminCustomPost } from "medusa-react"
import FocusModal from "../../../components/molecules/modal/focus-modal"
import Button from "../../../components/fundamentals/button"
import CrossIcon from "../../../components/fundamentals/icons/cross-icon"
import InputField from "../../../components/molecules/input"
import { NextSelect } from "../../../components/molecules/select/next-select"
import { Controller, useForm } from "react-hook-form"
import { Option, TrackingType } from "../../../types/shared"

type CreatePixelModalProps = {
  closeModal: () => void
}

type FormValues = {
  pixel_id: string
  type: { value: TrackingType; label: string }
}

function CreatePixelModal(props: CreatePixelModalProps) {
  const { closeModal } = props
  const notification = useNotification()
  const { register, handleSubmit, formState, control } = useForm<FormValues>({
    defaultValues: {
      type: { value: TrackingType.Fb, label: "Facebook" },
    },
  })

  const { mutateAsync: createPixel } = useAdminCustomPost("/admin/pixels", [
    "pixels",
  ])

  const onSubmit = async (data: FormValues) => {
    try {
      console.log({ data })
      const res = await createPixel({ ...data, type: data.type.value })
      notification("Success", "New Facebook Pixel added", "success")
    } catch (e) {
      notification("Error", (e as any).message, "error")
    } finally {
      closeModal()
    }
  }

  const { isDirty, isValid } = formState

  const options = [
    { value: TrackingType.Fb.toString(), label: "Facebook" },
    { value: TrackingType.Gg.toString(), label: "Google" },
    { value: TrackingType.Tiktok.toString(), label: "Tiktok" },
  ]

  return (
    <FocusModal>
      <FocusModal.Header>
        <div className="flex w-full justify-between px-8 medium:w-8/12">
          <Button size="small" variant="ghost" onClick={closeModal}>
            <CrossIcon size={20} />
          </Button>
          <div className="flex gap-x-small">
            <Button
              size="small"
              variant="primary"
              onClick={handleSubmit(onSubmit)}
              disabled={!isDirty && !isValid}
              className="rounded-rounded"
            >
              Add Pixel
            </Button>
          </div>
        </div>
      </FocusModal.Header>

      <FocusModal.Main className="no-scrollbar flex w-full justify-center">
        <div className="my-16 max-w-[700px] small:w-4/5 medium:w-7/12 large:w-6/12">
          <h1 className="inter-xlarge-semibold pb-8 text-grey-90">
            Add Tracking Pixel
          </h1>
          <div className="grid grid-cols-1 gap-6">
            <div className="w-full">
              <InputField
                label="Pixel ID"
                type="string"
                {...register("pixel_id", {
                  required: true,
                })}
                className="w-[338px]"
                placeholder="Enter Pixel ID"
              />
              <p className="text-small text-grey-50">
                This pixel will initiate Add to Cart, Purchase, and Checkout
                Events.
              </p>
            </div>

            <Controller
              name="type"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <NextSelect
                  label={"Tracking Type"}
                  // options={options}
                  value={value}
                  isMulti={false}
                  onChange={(e: any) => {
                    onChange(e)
                  }}
                  onBlur={onBlur}
                  options={options}
                />
              )}
            />
          </div>
        </div>
      </FocusModal.Main>
    </FocusModal>
  )
}

function Index() {
  const [isCreateModalVisible, openCreateModal, closeCreateModal] =
    useToggleState(false)

  const actions: ActionType[] = [
    {
      label: "Create Pixel",
      onClick: openCreateModal,
    },
  ]

  return (
    <div>
      <Breadcrumb
        currentPage="Social tracking"
        previousBreadcrumb="Settings"
        previousRoute="/a/settings"
      />
      <BodyCard
        title="Social tracking"
        subtitle="Social tracking pixel id form Facebook, Google, Tiktok, .etc for tracking events in store."
        actionables={actions}
      >
        <PixelTable />

        <Fade isVisible={isCreateModalVisible} isFullScreen>
          <CreatePixelModal closeModal={closeCreateModal} />
        </Fade>
      </BodyCard>
    </div>
  )
}

export default Index
