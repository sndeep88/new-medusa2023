import { Fragment, useEffect, useRef } from "react"
import { Product } from "types/medusa"

export default function ProductDesc({
  prodDesc,
  product,
}: {
  prodDesc: any
  product: Product
}) {
  const content = JSON.parse(prodDesc?.content ?? "{}")

  return (
    <>
      {Object.keys(content).length > 0 ? (
        content.blocks.map((block: any, idx: number) => (
          <Fragment key={idx}>{renderComp(block)}</Fragment>
        ))
      ) : (
        <p>{product.description}</p>
      )}
    </>
  )
}

function renderComp(block: { type: string; data: any }) {
  switch (block.type) {
    case "header":
      return <Heading text={block.data.text} level={block.data.level} />
    case "paragraph":
      return (
        <p
          className="text-[16px]"
          dangerouslySetInnerHTML={{ __html: block.data.text }}
        />
      )
    case "image":
    case "simpleImage":
      return (
        <img
          src={block.data.url}
          alt={block.data.caption ?? "simpleImage"}
          className=" ls-is-cached lazyloaded"
        />
      )
    default:
      return null
  }
}

function Heading({ text, level }: { text: string; level: number }) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  return (
    <Tag className="text-[18px] " dangerouslySetInnerHTML={{ __html: text }} />
  )
}
