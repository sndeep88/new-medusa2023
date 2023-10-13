import { medusaClient } from "@lib/config"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Product } from "types/medusa"
import ReviewForm from "./review-form"
import clsx from "clsx"
import ReviewCard from "./review-card"

interface Props {
  product?: Product
}

async function fetchProductReviews(productId: string) {
  return medusaClient.client.request(
    "GET",
    `/store/product-reviews/${productId}`
  )
}

function ProductReview({ product }: Props) {
  const { data } = useQuery(
    ["product-reviews", product?.id],
    () => fetchProductReviews(product?.id ?? ""),
    { enabled: !!product?.id }
  )

  const { product_reviews = [] } = data ?? {}

  const [reviewForm, setReviewForm] = useState(false)

  return (
    <>
      {product_reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {product_reviews.map((review: any) => {
            return <ReviewCard key={review.id} review={review} />
          })}
        </div>
      ) : (
        <>
          <div className="text-center">
            <h5 className="mb-3">NO REVIEWS YET</h5>
            <p className="mb-3">Write your first review now!</p>
          </div>
        </>
      )}
      <div className="text-center">
        <button
          className="btn btn-lg btn-primary"
          onClick={() => setReviewForm(true)}
        >
          Write a review
        </button>
        {reviewForm && (
          <ReviewForm product={product} onDone={() => setReviewForm(false)} />
        )}
      </div>
    </>
  )
}

export default ProductReview
