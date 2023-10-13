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
              <span className="text-gray-700">Home</span>
            </div>
          </span>
        </li>
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
