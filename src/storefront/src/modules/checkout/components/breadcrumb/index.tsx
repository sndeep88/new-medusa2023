type Page = {
  name: string
  href: string
}

export default function Breadcrumb({ pages }: { pages: Page[] }) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center text-sm">
        <li>
          <span>
            <div>
              {/* <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" /> */}
              <span className="text-blue-500">Shopping cart</span>
            </div>
          </span>
        </li>
        {/* <li>
          <Link href="#">
            <div className="flex items-center text-blue-500">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <span className="">Library</span>
            </div>
          </Link>
        </li> */}
        {pages.map((page) => (
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
              <span
                // href={page.href}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={"page"}
              >
                {page.name}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
