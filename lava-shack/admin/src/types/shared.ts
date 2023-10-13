import { Image } from "@medusajs/medusa"

export type Option = {
  value: string
  label: string
}

export enum ProductStatus {
  DRAFT = "draft",
  PROPOSED = "proposed",
  PUBLISHED = "published",
  REJECTED = "rejected",
}

export type DateFilter = null | {
  gt?: string
  lt?: string
}

export enum TaxRateType {
  REGION = "region",
  RATE = "rate",
}

export type PaginationProps = {
  limit: number
  offset: number
}

export type Idable = { id: string; [x: string]: any }

export type Role = {
  value: "admin" | "member" | "developer"
  label: string
}

export type ShippingOptionPriceType = {
  value: "flat_rate" | "calculated"
  label: string
}

export type FormImage = {
  url: string
  name?: string
  size?: number
  nativeFile?: File
}

export interface DragItem {
  index: number
  id: string
  type: string
}

export type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object ? Subset<K[attr]> : K[attr]
}

export type ExtendStore = {
  bannerImage: string | null
  siteIcon: string | null
  storeUrl: string | null
  logo: string | null
}

export enum TrackingType {
  Fb = "facebook",
  Gg = "google",
  Tiktok = "tiktok",
}

export type Pixel = {
  id: string
  createdAt: string
  updatedAt: string
  pixel_id: string
  enabled: boolean
  type: TrackingType
}

export enum PageStatus {
  PUBLISH = "publish",
  UNPUBLISH = "unpublish",
}

export type Page = {
  id: string
  createdAt: string
  updatedAt: string
  title: string
  slug: string
  status: PageStatus
  tag_id: string
  content: string
  tag: PageTag
}

export type PageTag = {
  id: string
  name: string
  code: string
}

export enum TemplateType {
  EMAIL = "email",
  SMS = "sms",
}

export type Template = {
  id: string
  updated_at: string
  title: string
  description: string
  subject: string
  template: string
  default_template: string
  type: TemplateType
  enable: boolean
}

export type ProductReview = {
  id: string
  created_at: string
  title: string
  content: string
  full_name: string
  rating: number
  enabled: boolean
  product_id: string
  images: Image[]
}
