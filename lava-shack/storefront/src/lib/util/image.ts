import { medusaClient } from "@lib/config"

import { useMutation } from "@tanstack/react-query"
import { FormImage } from "types/global"

const splitImages = (
  images: FormImage[]
): { uploadImages: FormImage[]; existingImages: FormImage[] } => {
  const uploadImages: FormImage[] = []
  const existingImages: FormImage[] = []

  images.forEach((image) => {
    if (image.nativeFile) {
      uploadImages.push(image)
    } else {
      existingImages.push(image)
    }
  })

  return { uploadImages, existingImages }
}

async function uploadImage(data: any) {
  return medusaClient.client.request("POST", "/store/upload", data)
}

export const prepareImages = async (images: FormImage[]) => {
  const { uploadImages, existingImages } = splitImages(images)

  let uploadedImgs: FormImage[] = []
  if (uploadImages.length > 0) {
    const files = uploadImages.map((i) => i.nativeFile)
    const formData = new FormData()
    for (const f of files) {
      formData.append("files", f as any)
    }
    uploadedImgs = await uploadImage(formData).then((data) => data.uploads)
  }

  return [...existingImages, ...uploadedImgs]
}
