import { Controller, useFieldArray, useForm } from "react-hook-form"
import Modal from "../../../../../components/molecules/modal"
import { FormImage, ProductReview } from "../../../../../types/shared"
import Button from "../../../../../components/fundamentals/button"
import Switch from "../../../../../components/atoms/switch"
import InputField from "../../../../../components/molecules/input"
import TextArea from "../../../../../components/molecules/textarea"
import XCircleIcon from "../../../../../components/fundamentals/icons/x-circle-icon"
import { useAdminCustomPost } from "medusa-react"
import { prepareImages } from "../../../../../utils/images"
import clsx from "clsx"

interface IModal {
  review?: ProductReview | null
  open: boolean
  onClose: () => void
}

type ReviewFormValues = {
  title: string
  rating: number
  content: string
  full_name: string
  images: FormImage[]
  enabled: boolean
}

export default function ReviewModal({ review, open, onClose }: IModal) {
  const { handleSubmit, reset, register, control, formState } =
    useForm<ReviewFormValues>({
      defaultValues: createDefaultValues(review),
    })

  const { mutate, isLoading: updating } = useAdminCustomPost(
    `/product-reviews/${review?.id}/update`,
    ["product-reviews", review?.id]
  )

  const onSubmit = async (data: ReviewFormValues) => {
    let preppedImages: FormImage[] = []

    try {
      preppedImages = await prepareImages(data.images)
    } catch (error) {
      console.log({ error })
    }

    const urls = preppedImages.map((i) => i.url)

    mutate(
      {
        ...data,
        images: urls,
      },
      {
        onSuccess: () => {
          onReset()
        },
      }
    )
  }

  const onReset = () => {
    reset(createDefaultValues(review))
    onClose()
  }

  const { isDirty } = formState

  const { fields, remove } = useFieldArray({
    control,
    name: "images",
  })

  const handleRemoveImage = (idx: number) => {
    remove(idx)
  }

  return (
    <Modal open={open} handleClose={onClose} isLargeModal>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header handleClose={onClose}>
            <h1 className="inter-xlarge-semibold m-0">Edit Review</h1>
          </Modal.Header>
          <Modal.Content>
            <div>
              <div className="mb-3 flex w-full flex-col">
                <label
                  htmlFor="enabled "
                  className="inter-small-semibold mb-xsmall items-center text-grey-50"
                >
                  Enabled
                </label>
                <Controller
                  control={control}
                  name="enabled"
                  render={({ field: { value, onChange } }) => (
                    <Switch checked={value} onCheckedChange={onChange} />
                  )}
                />
              </div>

              <div className="mb-3 flex w-full flex-col">
                <label
                  htmlFor="rating"
                  className="inter-small-semibold items-center text-grey-50"
                >
                  Rating
                </label>
                <Controller
                  control={control}
                  name="rating"
                  render={({ field: { value, onChange } }) => (
                    <span>
                      {[...Array(5).keys()].map((rate) => {
                        return (
                          <span
                            key={rate}
                            className={clsx(
                              rate <= value
                                ? "text-yellow-500"
                                : "text-grey-40",
                              "text-lg"
                            )}
                            onClick={() => onChange(rate)}
                          >
                            ★
                          </span>
                        )
                      })}
                    </span>
                  )}
                />
              </div>

              <div className="mb-3 w-full">
                <InputField
                  label="Title"
                  {...register("title", { required: "Title is required" })}
                />
              </div>
              <div className="mb-3 w-full">
                <InputField
                  label="Full Name"
                  {...register("full_name", {
                    required: "Full name is required",
                  })}
                />
              </div>
              <div className="mb-3 w-full">
                <TextArea
                  label="Title"
                  {...register("content", { required: "Title is required" })}
                  rows={5}
                />
              </div>

              <div className="mb-3 w-full">
                <label
                  htmlFor="images"
                  className="inter-small-semibold mb-xsmall items-center text-grey-50"
                >
                  Images
                </label>
                <div className="flex flex-wrap gap-x-3">
                  {fields.map((field, idx) => (
                    <div
                      key={field.id}
                      className="relative flex aspect-square max-w-[18%] items-center justify-center"
                    >
                      <span className="absolute -right-1 top-0">
                        <span
                          className="bg-grey-40 text-grey-50 hover:cursor-pointer"
                          onClick={() => handleRemoveImage(idx)}
                        >
                          <XCircleIcon />
                        </span>
                      </span>
                      <img
                        src={field.url}
                        alt={`Image ${field.id}`}
                        className="max-h-full max-w-full rounded-rounded object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Modal.Content>

          <Modal.Footer>
            <div className="flex w-full justify-end gap-x-2">
              <Button
                size="small"
                variant="secondary"
                type="button"
                onClick={onReset}
              >
                Cancel
              </Button>
              <Button
                size="small"
                variant="primary"
                type="submit"
                disabled={!isDirty}
                loading={updating}
              >
                Save and close
              </Button>
            </div>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  )
}

function createDefaultValues(review?: ProductReview | null): ReviewFormValues {
  return {
    title: review?.title ?? "",
    rating: review?.rating ?? 0,
    content: review?.content ?? "",
    full_name: review?.full_name ?? "",
    images: review?.images ?? [],
    enabled: review?.enabled ?? false,
  }
}
