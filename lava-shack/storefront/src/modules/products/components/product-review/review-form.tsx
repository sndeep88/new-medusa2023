import { medusaClient, queryClient } from "@lib/config"
import { prepareImages } from "@lib/util/image"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Loading from "@modules/common/components/loading"
import Textarea from "@modules/common/components/textarea"
import Spinner from "@modules/common/icons/spinner"
import { useMutation } from "@tanstack/react-query"
import clsx from "clsx"
import { useMeCustomer } from "medusa-react"
import Image from "next/image"
import { ChangeEvent, useEffect, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { FormImage } from "types/global"
import { Product } from "types/medusa"

function updateProductReview({
  productId,
  data,
}: {
  productId: string
  data: any
}) {
  return medusaClient.client.request(
    "POST",
    `/store/product-reviews/${productId}`,
    { data }
  )
}

interface Props {
  product?: Product
  onDone: () => void
}

type ReviewFormValues = {
  title: string
  content: string
  rating: number
  full_name: string
  images: FormImage[]
}

function ReviewForm({ product, onDone }: Props) {
  const { customer } = useMeCustomer()
  const [isLoading, setIsLoading] = useState(false)

  const useUpdateReview = useMutation({
    mutationFn: updateProductReview,
    mutationKey: ["product-reviews", product?.id],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product-reviews", product?.id],
      })
    },
  })

  const form = useForm<ReviewFormValues>({
    defaultValues: createBlank(),
  })

  const onSubmit = async ({ images, ...data }: ReviewFormValues) => {
    setIsLoading(true)
    var uploadData: { [key: string]: any } = { ...data, images: [] }

    if (images && images.length > 0) {
      const uploads = await prepareImages(images)
      uploadData["images"] = uploads.map((img) => ({
        url: img.url,
      }))
    }

    useUpdateReview.mutate({
      productId: product?.id ?? "",
      data: uploadData,
    })

    setIsLoading(false)
    onDone()
  }

  const { register, handleSubmit, control, formState } = form
  const { isDirty, isValid, isLoading: formLoading } = formState

  useEffect(() => {
    if (!customer) return

    form.setValue("full_name", `${customer.first_name} ${customer.last_name}`)
  }, [customer])

  const { fields, replace, append } = useFieldArray({
    control,
    name: "images",
  })

  const handleImageUpload = (ev: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(ev.target.files ?? []) as File[]

    const toAppend = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      nativeFile: file,
      selected: false,
    }))

    const allowed = 50 - fields.length

    // if (files.length) {
    //   replace(toAppend)
    // } else {
    append(toAppend.slice(0, allowed))
    // }
  }

  return (
    <div className="w-full mt-3">
      {isLoading && <Loading />}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="col-span-full text-center">
          <h3 className="section-title">Write a review</h3>
        </div>
        <div className="col-span-full items-start text-left">
          <label htmlFor="rating">Rating</label>
          <Controller
            name="rating"
            control={control}
            rules={{
              required: true,
              min: 1,
              max: 5,
            }}
            render={({ field: { value, onChange } }) => (
              <div className="flex gap-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className={clsx(
                      "text-lg",
                      i <= value ? "text-yellow-500" : "text-gray-500"
                    )}
                    onClick={() => {
                      onChange(i)
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            )}
          />
        </div>
        <div className="col-span-full">
          <div className="flex flex-wrap gap-3">
            {fields.map((field) => (
              <span key={field.id} className="w-24 aspect-square relative">
                <Image
                  src={field.url}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="w-full object-cover"
                />
              </span>
            ))}

            {fields.length < 50 && (
              <span className="w-24 h-24 aspect-square rounded border-2 !border-dashed border-gray-300">
                <label
                  htmlFor="upload"
                  className="w-full h-full p-2 hover:cursor-pointer"
                >
                  <input
                    id="upload"
                    onChange={handleImageUpload}
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                  />
                  <span className="text-sm !leading-0 text-gray-400">
                    Upload review image
                  </span>
                </label>
              </span>
            )}
          </div>
        </div>
        <div className="col-span-full">
          <Textarea
            label="Message"
            required
            {...register("content", { required: true })}
          />
        </div>
        <div>
          <Input
            label="Title"
            required
            {...register("title", { required: true })}
          />
        </div>
        <div>
          <Input
            label="Full name"
            required
            {...register("full_name", { required: true })}
            disabled={Boolean(customer)}
          />
        </div>
        <Button
          className="col-span-full"
          onClick={handleSubmit(onSubmit)}
          disabled={!isDirty || !isValid || isLoading || formLoading}
        >
          {isLoading ? <Spinner /> : "Review"}
        </Button>
      </div>
    </div>
  )
}

function createBlank(): ReviewFormValues {
  return {
    title: "",
    content: "",
    rating: 0,
    full_name: "",
    images: [],
  }
}

export default ReviewForm
