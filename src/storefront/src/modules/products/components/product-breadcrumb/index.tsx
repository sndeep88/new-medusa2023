import Link from "next/link"

export default function ProductBreadcrumb({
  productName,
}: {
  productName: string
}) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center text-sm">
        <li>
          <span>
            <a>
              <span className="text-blue-500">Home</span>
            </a>
          </span>
        </li>
        <li>
          <span>
            <a className="flex items-center text-blue-500">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <span className="">Library</span>
            </a>
          </span>
        </li>
        <li>
          <span>
            <a className="flex items-center text-gray-500">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <span className="">{productName}</span>
            </a>
          </span>
        </li>
        {/* {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <a
                href={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))} */}
      </ol>
    </nav>
  )
}
