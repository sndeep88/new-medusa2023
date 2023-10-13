import { Product } from "@medusajs/medusa"
import { useAdminCustomQuery } from "medusa-react"
import Section from "../../../../../components/organisms/section"
import moment from "moment"
import useToggleState from "../../../../../hooks/use-toggle-state"
import ReviewModal from "./review-modal"
import { ProductReview } from "../../../../../types/shared"
import { useState } from "react"

interface Props {
  product: Product
}

function Review({ product }: Props) {
  const { data } = useAdminCustomQuery<
    any,
    { product_reviews: ProductReview[] }
  >(`/product-reviews/${product.id}`, ["product-reviews", product.id])
  const { product_reviews = [] } = data ?? {}

  const edit = (review: ProductReview) => () => {
    setReview(review)
    toggle()
  }

  const { state, close, toggle } = useToggleState()
  const [review, setReview] = useState<ProductReview | null>(null)

  const onClose = () => {
    setReview(null)
    close()
  }

  return (
    <Section
      title="Reviews"
    // customActions={
    //   <div className="flex items-center gap-x-xsmall">
    //     <Button
    //       variant="secondary"
    //       size="small"
    //       type="button"
    //       onClick={toggle}
    //     >
    //       {product.thumbnail ? "Edit" : "Upload"}
    //     </Button>
    //     {product.thumbnail && (
    //       <TwoStepDelete onDelete={handleDelete} deleting={updating} />
    //     )}
    //   </div>
    // }
    >
      <div className="mt-large flex flex-col gap-y-xsmall divide-y divide-gray-200">
        {product_reviews.length > 0 ? (
          product_reviews.map((review) => (
            <div className="flex w-full items-start justify-between py-2">
              <div className="md:w-1/2 w-full gap-y-0" key={review.id}>
                <h3
                  className={review.enabled ? "inter-base-regular transition-all duration-200 hover:cursor-pointer hover:text-blue-40"
                    : "text-gray-500 inter-base-regular transition-all duration-200 hover:cursor-pointer hover:text-blue-40"}
                  onClick={edit(review)}
                >
                  {review.title} ({review.full_name})
                </h3>
                <span>
                  {[...Array(5).keys()].map((rate) => {
                    if (rate <= review.rating) {
                      return (
                        <span key={rate} className={review.enabled ? "text-yellow-500" : "text-yellow-100"}>
                          ★
                        </span>
                      )
                    } else {
                      return (
                        <span key={rate} className="text-gray-500">
                          ★
                        </span>
                      )
                    }
                  })}
                </span>
                <p className="mt-2 text-grey-50">{review.content}</p>
                <span className="leading-0 text-xsmall text-grey-50">
                  {moment(review.created_at).format("DD/MM/YYYY HH:mm")}
                </span>
              </div>
              <div className="md:w-1/2 flex h-full w-full items-end justify-end">
                <div className="flex w-full flex-row-reverse flex-wrap  gap-xsmall">
                  {review.images.map((image: any, idx) => (
                    <div
                      key={image.id}
                      className="flex aspect-square max-w-[18%] items-center justify-center"
                    >
                      <img
                        src={image.url}
                        alt={`Image ${idx + 1}`}
                        className="max-h-full max-w-full rounded-rounded object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full">No reviews</div>
        )}
        {review && (
          <ReviewModal open={state} onClose={onClose} review={review} />
        )}
      </div>
    </Section>
  )
}
export default Review
