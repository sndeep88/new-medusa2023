import { ConfigType, ProviderType } from "./enums"

type SystemConfigTypes = {
  id: string
  created_at: string
  updated_at: string
  type: ConfigType
  provider: ProviderType
  key: string
  key_name: string
  key_description: string
  value: string
  required: boolean
}

export * from "./enums"
export default SystemConfigTypes
