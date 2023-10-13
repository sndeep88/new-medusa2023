import clsx from "clsx"
import Image from "next/image"

export default function ReviewCard({ review }: any) {
  return (
    <div className="p-4" key={review.id}>
      <div className="flex items-center">
        <div className="flex items-center">
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="flex flex-col">
                <div className="text-gray-600 text-sm">{review.full_name}</div>
                {/* <div className="text-gray-400 text-xs">
                        {review.created_at}
                      </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-1">
        {[1, 2, 3, 4, 5].map((i) => {
          return (
            <span
              key={i}
              className={clsx(
                "text-lg",
                i <= review.rating ? "text-yellow-500" : "text-gray-500"
              )}
            >
              ★
            </span>
          )
        })}
      </div>
      {review.images && review.images.length > 0 && (
        <div className="w-full flex flex-wrap gap-2 mt-2">
          {review.images.map((image: any) => (
            <span
              key={image.id}
              className="min-w-16 w-16 aspect-square relative rounded overflow-hidden"
            >
              <Image
                src={image.url}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="w-full object-cover"
              />
            </span>
          ))}
        </div>
      )}
      <div className="flex flex-col mt-2">
        <div className="text-gray-600 text-sm">{review.title}</div>
        <div className="text-gray-400 text-xs">{review.content}</div>
      </div>
    </div>
  )
}
