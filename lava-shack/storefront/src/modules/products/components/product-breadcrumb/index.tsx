import Link from "next/link"

export default function ProductBreadcrumb({
  productName,
}: {
  productName: string
}) {
  return (
    <nav className="d-none d-md-block" aria-label="breadcrumb">
      <div className="breadcrumb">
        <span className="breadcrumb-item">
          <a>Home</a>
        </span>
        <span className="breadcrumb-item">
          <a>garden</a>
        </span>
        <span className="breadcrumb-item active" aria-current="page">
          {productName}
        </span>
      </div>
    </nav>
  )
}
