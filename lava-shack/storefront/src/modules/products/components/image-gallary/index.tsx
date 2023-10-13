import { Image as MedusaImage } from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import clsx from "clsx"
import Image from "next/image"
import { useRef, useState, TouchEvent } from "react"
import { useSwipeable } from "react-swipeable"


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
  // setup ref for your usage
  const myRef = useRef();

  const handlers = useSwipeable({
    onSwipedLeft: () => right(),
    onSwipedRight: () => left(),
  })
  const refPassthrough = (el: any) => {
    // call useSwipeable ref prop with el
    handlers.ref(el);

    // set myRef el so you can access it yourself
    myRef.current = el;
  }


  const [index, setIndex] = useState(0)

  const [featureImage, setFeatureImage] = useState(images[index])

  const left = () => {
    if (index > 0) {
      setIndex(index - 1)
      setFeatureImage(images[index - 1])
    }
  };
  const right = () => {
    if (index < images.length - 1) {
      setIndex(index + 1)
      setFeatureImage(images[index + 1])
    }
  }

  return (
    <div className="relative px-[10px]">
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
      <div className="w-full flex items-center relative aspect-square" {...handlers} ref={refPassthrough}>
        <button
          className="h-8 w-8 relative z-10 max-h-8 max-w-8 left-2"
          onClick={() => {
            // setIndex(index > 1 ? index - 1 : 0);
            // setFeatureImage(images[index > 1 ? index - 1 : 0])
            left();
          }}
        >
          <Image src={"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaWQ9IkxheWVyXzFfMV8iIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE2IDE2OyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik04LDBDMy41ODIsMCwwLDMuNTgyLDAsOHMzLjU4Miw4LDgsOHM4LTMuNTgyLDgtOFMxMi40MTgsMCw4LDB6IE0xMC4zNTQsMTIuNjQ2bC0wLjcwNywwLjcwN0w0LjI5Myw4bDUuMzU0LTUuMzU0ICBsMC43MDcsMC43MDdMNS43MDcsOEwxMC4zNTQsMTIuNjQ2eiIvPjwvc3ZnPg=="}
            layout="fill" objectFit="cover" className="absolute inset-0" alt="Previous image" />

        </button>
        <Image
          src={featureImage.url}
          layout="fill"
          objectFit="cover"
          priority={true}
          className="absolute inset-0"
          alt={`Product image`}
        />
        <button
          className="h-8 w-8 absolute max-h-12  z-10 right-2"
          onClick={() => {
            // setIndex(index + 1 < images.length - 1 ? index + 1 : images.length - 1);
            // setFeatureImage(images[index + 1 < images.length - 1 ? index + 1 : images.length - 1])
            right();
          }}
        >
          <Image src={"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaWQ9IkxheWVyXzFfMV8iIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE2IDE2OyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik04LDBDMy41ODIsMCwwLDMuNTgyLDAsOHMzLjU4Miw4LDgsOHM4LTMuNTgyLDgtOFMxMi40MTgsMCw4LDB6IE02LjM1NCwxMy4zNTRsLTAuNzA3LTAuNzA3TDEwLjI5Myw4TDUuNjQ2LDMuMzU0ICBsMC43MDctMC43MDdMMTEuNzA3LDhMNi4zNTQsMTMuMzU0eiIvPjwvc3ZnPg=="}
            layout="fill" objectFit="cover" className="absolute inset-0 h-" alt="Previous image" />

        </button>
      </div>

      <div className="w-full py-2 mt-2 flex flex-row flex-nowrap space-x-4 overflow-x-auto ">
        {images.map((image, index) => {
          return (
            <div
              ref={(image) => imageRefs.current.push(image)}
              key={image.id}
              className={clsx(
                "relative flex-shrink-0 aspect-square w-28 rounded overflow-hidden cursor-pointer",
                featureImage.id === image.id && "border-2 border-black"
              )}
              id={image.id}
              onClick={() => {
                setIndex(index);
                setFeatureImage(image)
              }}
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

      {/* <div className="grid grid-cols-2 gap-3 w-full mt-3">
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
      </div> */}
    </div>
  )
}

export default ImageGallery
