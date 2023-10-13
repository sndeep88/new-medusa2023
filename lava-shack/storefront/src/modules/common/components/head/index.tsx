import NextHead from "next/head"
import React from "react"

type HeadProps = {
  title?: string
  description?: string | null
  image?: string | null
  icon?: string | null
  storeData: any
}

const Head: React.FC<HeadProps> = ({ title, description, image, icon, storeData }) => {
  return (
    <NextHead>
      <title>{title} | {storeData ? storeData.store_name : "Shopping Center"}</title>
      <meta itemProp="name" content={title} />
      {description && <meta itemProp="description" content={description} />}
      {image && <meta itemProp="image" content={image} />}
      <link rel="icon" href={icon ? icon : "/favicon.ico"} />
    </NextHead>
  )
}

export default Head
