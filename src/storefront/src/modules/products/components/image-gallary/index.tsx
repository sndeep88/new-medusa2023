import { Image as MedusaImage } from "@medusajs/medusa"
import Image from "next/image"
import { useRef } from "react"

type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }

  return (
    <div className="relative">
      {/* <div className="hidden small:flex flex-col gap-y-4 sticky top-20">
        {images.map((image, index) => {
          return (
            <button
              key={image.id}
              className="h-14 w-12 relative border border-white"
              onClick={() => {
                handleScrollTo(image.id)
              }}
            >
              <span className="sr-only">Go to image {index + 1}</span>
              <Image
                src={image.url}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"
                alt="Thumbnail"
              />
            </button>
          )
        })}
      </div> */}
      <div className="w-full flex items-center relative aspect-square">
        <Image
          src={images[0].url}
          layout="fill"
          objectFit="cover"
          priority={true}
          className="absolute inset-0"
          alt={`Product image`}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 w-full mt-3">
        {images.slice(1).map((image, index) => {
          return (
            <div
              ref={(image) => imageRefs.current.push(image)}
              key={image.id}
              className="relative aspect-[29/34] w-full"
              id={image.id}
            >
              <Image
                src={image.url}
                layout="fill"
                objectFit="cover"
                priority={index <= 2 ? true : false}
                className="absolute inset-0"
                alt={`Product image ${index + 1}`}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
