import { Image as MedusaImage } from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import PlaceholderImage from "@modules/common/icons/placeholder-image"
import clsx from "clsx"
import Image from "next/image"
import React from "react"
import { ProductPreviewType } from "types/global"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: MedusaImage[] | null
  size?:
    | "small"
    | "medium"
    | "large"
    | "full"
    | "extra-small"
    | "cart-thumbnail"
  hoverable?: boolean
  buynow?: () => void
  price?: ProductPreviewType["price"]
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  hoverable = false,
  buynow,
  price,
}) => {
  const initialImage = thumbnail || images?.[0]?.url

  return (
    <div
      className={clsx(
        "relative overflow-hidden transition duration-[2000s] ease-in-out",
        {
          group: hoverable,
        }
      )}
    >
      <Button
        className="absolute z-10 rounded-none !transition !duration-500 ease-in-out -translate-y-[500px] -translate-x-1/2 left-1/2 top-1/2 group-hover:translate-y-0"
        onClick={buynow}
        variant="primary"
      >
        Buy now
      </Button>
      <div
        className={clsx(
          "relative aspect-[29/34]",
          {
            "w-[65px] aspect-square": size === "cart-thumbnail",
            "w-[70px] aspect-square": size === "extra-small",
            "w-[180px]": size === "small",
            "w-[290px]": size === "medium",
            "w-[440px]": size === "large",
            "w-full": size === "full",
          },
          "transition duration-500 ease-in-out group-hover:scale-110"
        )}
      >
        <ImageOrPlaceholder image={initialImage} size={size} />
      </div>

      {price && price.price_type === "sale" && (
        <div className="badges">
          <span className="badge bg-secondary">Save {price.diff_amount}</span>
        </div>
      )}
    </div>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string }) => {
  return image ? (
    <Image
      src={image}
      alt="Thumbnail"
      layout="fill"
      objectFit="cover"
      objectPosition="center"
      className={clsx("absolute inset-0")}
      draggable={false}
    />
  ) : (
    <div className="w-full h-full absolute inset-0 bg-gray-100 flex items-center justify-center">
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  )
}

export default Thumbnail
