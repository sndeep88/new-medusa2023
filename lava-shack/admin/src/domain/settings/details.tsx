import { AdminPostStoreReq, Store } from "@medusajs/medusa"
import {
  useAdminCustomPost,
  useAdminCustomQuery,
  useAdminStore,
  useAdminUpdateStore,
  useMedusa,
} from "medusa-react"
import React, { ChangeEvent, useEffect } from "react"
import { Controller, Field, useForm } from "react-hook-form"
import BreadCrumb from "../../components/molecules/breadcrumb"
import Input from "../../components/molecules/input"
import BodyCard from "../../components/organisms/body-card"
import useNotification from "../../hooks/use-notification"
import { getErrorMessage } from "../../utils/error-messages"
import FileUploadField from "../../components/atoms/file-upload-field"
import { prepareImages } from "../../utils/images"
import { ExtendStore, FormImage } from "../../types/shared"
import Actionables, { ActionType } from "../../components/molecules/actionables"
import TrashIcon from "../../components/fundamentals/icons/trash-icon"
import EditIcon from "../../components/fundamentals/icons/edit-icon"
import Button from "../../components/fundamentals/button"

type AccountDetailsFormData = {
  name: string
  swap_link_template?: string | null
  payment_link_template?: string | null
  invite_link_template?: string | null
  bannerImage: FormImage
  siteIcon: FormImage
  storeUrl?: string | null
  logo: FormImage
}

const AccountDetails = () => {
  const { register, reset, handleSubmit, setValue, control } =
    useForm<AccountDetailsFormData>()
  const { store } = useAdminStore()
  const { mutate } = useAdminUpdateStore()
  const notification = useNotification()

  const { data: { extendStore } = { extendStore: {} } } = useAdminCustomQuery<
    any,
    any
  >("/extend-store", ["extend-store"])
  const { mutate: mutateExtendStore } = useAdminCustomPost("extend-store", [
    "extend-store",
  ])

  const handleCancel = () => {
    if (store) {
      reset(mapStoreDetails({ ...store, ...extendStore }))
    }
  }

  useEffect(() => {
    handleCancel()
  }, [store, extendStore])

  const onSubmit = async ({
    bannerImage,
    siteIcon,
    storeUrl,
    logo,
    ...data
  }: AccountDetailsFormData) => {
    const validateSwapLinkTemplate = validateUrl(data.swap_link_template)
    const validatePaymentLinkTemplate = validateUrl(data.payment_link_template)
    const validateInviteLinkTemplate = validateUrl(data.invite_link_template)

    if (!validateSwapLinkTemplate) {
      notification("Error", "Malformed swap url", "error")
      return
    }

    if (!validatePaymentLinkTemplate) {
      notification("Error", "Malformed payment url", "error")
      return
    }

    if (!validateInviteLinkTemplate) {
      notification("Error", "Malformed invite url", "error")
      return
    }

    let extendStoreUpdate = { ...extendStore }

    if (bannerImage.nativeFile) {
      const banner = await prepareImages([bannerImage])
      extendStoreUpdate.bannerImage = banner[0].url
    }

    if (siteIcon.nativeFile) {
      const icon = await prepareImages([siteIcon])
      extendStoreUpdate.siteIcon = icon[0].url
    }

    if (storeUrl) {
      extendStoreUpdate.storeUrl = storeUrl
    }

    if (logo.nativeFile) {
      const logoImage = await prepareImages([logo])
      extendStoreUpdate.logo = logoImage[0].url
    }

    mutateExtendStore(extendStoreUpdate)

    const storeUpdate = {
      ...data,
    } as AdminPostStoreReq

    mutate(storeUpdate, {
      onSuccess: () => {
        notification("Success", "Successfully updated store", "success")
      },
      onError: (error) => {
        notification("Error", getErrorMessage(error), "error")
      },
    })
  }

  const handleImage =
    (name: "bannerImage" | "siteIcon" | "logo") => (files: File[]) => {
      if (!files.length) return
      const image = {
        url: URL.createObjectURL(files[0]),
        name: files[0].name,
        size: files[0].size,
        nativeFile: files[0],
      }

      setValue(name, image)
    }

  return (
    <form className="flex-col py-5">
      <BreadCrumb
        previousRoute="/a/settings/"
        previousBreadcrumb="Settings"
        currentPage="Store Details"
      />
      <div className="flex w-full max-w-[632px] flex-row gap-x-3">
        <BodyCard
          events={[
            {
              label: "Save",
              type: "button",
              onClick: handleSubmit(onSubmit),
            },
            {
              label: "Cancel changes",
              type: "button",
              onClick: handleCancel,
            },
          ]}
          title="Store Details"
          subtitle="Manage your business details"
        >
          <h6 className="inter-base-semibold mt-large">General</h6>
          <Input
            className="mt-base"
            label="Store name"
            {...register("name")}
            placeholder="Medusa Store"
          />
          <Input
            className="mt-base"
            label="Store URL"
            {...register("storeUrl")}
            placeholder="https://medusa.com"
          />
          <div className="mt-base flex w-full items-center">
            <Controller
              name="logo"
              control={control}
              render={({ field: { value } }) => (
                <>
                  <label className="mb-xsmall text-sm text-gray-600">
                    Logo
                  </label>
                  {value && value.url ? (
                    <div className="relative ml-auto aspect-square w-[100px]">
                      <div className="flex h-full w-full items-center justify-center">
                        <img
                          src={value.url}
                          alt={value.name || "Uploaded image"}
                          className="aspect-square h-full min-w-full rounded-rounded"
                        />
                      </div>

                      <span className="absolute -top-1 -right-1">
                        <Button
                          onClick={() => {
                            setValue("logo", { url: "" })
                          }}
                          variant="secondary"
                          className="rounded-full bg-gray-300 p-1"
                          type="button"
                        >
                          <EditIcon size={16} />
                        </Button>
                      </span>
                    </div>
                  ) : (
                    <FileUploadField
                      onFileChosen={handleImage("logo")}
                      filetypes={["image/*"]}
                      className="ml-auto flex aspect-square w-[100px] items-center justify-center py-large"
                      text={"Upload image"}
                    />
                  )}
                </>
              )}
            />{" "}
          </div>
          <div className="mt-base flex w-full items-center">
            <Controller
              name="siteIcon"
              control={control}
              render={({ field: { value } }) => (
                <>
                  <label className="mb-xsmall text-sm text-gray-600">
                    Site icon
                  </label>
                  {value && value.url ? (
                    <div className="relative ml-auto aspect-square w-[100px]">
                      <div className="flex h-full w-full items-center justify-center">
                        <img
                          src={value.url}
                          alt={value.name || "Uploaded image"}
                          className="aspect-square h-full min-w-full rounded-rounded"
                        />
                      </div>

                      <span className="absolute -top-1 -right-1">
                        <Button
                          onClick={() => {
                            setValue("siteIcon", { url: "" })
                          }}
                          variant="secondary"
                          className="rounded-full bg-gray-300 p-1"
                          type="button"
                        >
                          <EditIcon size={16} />
                        </Button>
                      </span>
                    </div>
                  ) : (
                    <FileUploadField
                      onFileChosen={handleImage("siteIcon")}
                      filetypes={["image/*"]}
                      className="ml-auto flex aspect-square w-[100px] items-center justify-center py-large"
                      text={"Upload icon"}
                    />
                  )}
                </>
              )}
            />{" "}
          </div>
          <div className="mt-base">
            <label className="mb-xsmall text-sm text-gray-600">
              Banner Image
            </label>

            <Controller
              control={control}
              name="bannerImage"
              render={({ field: { value } }) =>
                value && value.url ? (
                  <Image
                    image={value}
                    remove={() => setValue("bannerImage", { url: "" })}
                  />
                ) : (
                  <FileUploadField
                    onFileChosen={handleImage("bannerImage")}
                    filetypes={["image/*"]}
                    className="py-large"
                  />
                )
              }
            />
          </div>
          <h6 className="inter-base-semibold mt-2xlarge">Advanced settings</h6>
          <Input
            className="mt-base"
            label="Swap link template"
            {...register("swap_link_template")}
            placeholder="https://acme.inc/swap={swap_id}"
          />
          <Input
            className="mt-base"
            label="Draft order link template"
            {...register("payment_link_template")}
            placeholder="https://acme.inc/payment={payment_id}"
          />
          <Input
            className="mt-base"
            label="Invite link template"
            {...register("invite_link_template")}
            placeholder="https://acme-admin.inc/invite?token={invite_token}"
          />
        </BodyCard>
      </div>
    </form>
  )
}

const validateUrl = (address: string | null | undefined) => {
  if (!address || address === "") {
    return true
  }

  try {
    const url = new URL(address)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch (_) {
    return false
  }
}

const mapStoreDetails = (
  store: Store & ExtendStore
): AccountDetailsFormData => {
  return {
    name: store.name,
    swap_link_template: store.swap_link_template,
    payment_link_template: store.payment_link_template,
    invite_link_template: store.invite_link_template,
    bannerImage: { url: store.bannerImage ?? "" },
    siteIcon: { url: store.siteIcon ?? "" },
    storeUrl: store.storeUrl ?? "",
    logo: { url: store.logo ?? "" },
  }
}

type ThumbnailProps = {
  image: FormImage
  remove: () => void
}

const Image = ({ image, remove }: ThumbnailProps) => {
  return (
    <div className="group relative flex items-center justify-between rounded-rounded px-base py-xsmall hover:bg-grey-5">
      <div className="flex aspect-video w-full items-center justify-center">
        <img
          src={image.url}
          alt={image.name || "Uploaded image"}
          className="aspect-video h-full rounded-rounded object-cover"
        />
      </div>
      <span className="absolute -top-1 -right-1">
        <Button
          type="button"
          onClick={remove}
          variant="nuclear"
          className="rounded-full p-1.5"
        >
          <TrashIcon size={20} />
        </Button>
      </span>
    </div>
  )
}

export default AccountDetails
