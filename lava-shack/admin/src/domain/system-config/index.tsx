import { useAdminCustomQuery } from "medusa-react"
import BackButton from "../../components/atoms/back-button"
import TypeOverview from "./overview"
import { useEffect, useMemo, useState } from "react"
import SystemConfig, { ConfigType } from "./types"
import EditConfig from "./edit"
import _ from "lodash"

function SystemConfigRoutes() {
  const { data, isLoading } = useAdminCustomQuery<
    any,
    { configs: SystemConfig[] }
  >("/system-config", ["system-config"])

  const [selectedType, setSelectedType] = useState<ConfigType | undefined>(
    undefined
  )

  useEffect(() => {
    if (data && data.configs && data.configs.length > 0) {
      setSelectedType(data.configs[0].type)
    }
  }, [data])

  const handleChange = (type: ConfigType) => {
    if (type !== selectedType) {
      setSelectedType(type)
    }
  }

  const types = useMemo<ConfigType[]>(() => {
    if (data && data.configs) {
      const types = _.uniqBy(data.configs, "type")
      return _.sortBy(types, "created_at").map((c) => c.type)
    }

    return []
  }, [data])

  const configs = (() => {
    if (data && data.configs) {
      return data.configs.filter((c) => c.type === selectedType)
    }

    return []
  })()

  return (
    <div className="flex h-full flex-col gap-y-xsmall">
      <BackButton label="Back to Settings" path="/a/settings" />
      <div className="grid grid-cols-1 gap-xsmall pb-xlarge medium:grid-cols-3">
        <div className="h-full w-full">
          <TypeOverview
            types={types}
            handleChange={handleChange}
            selectedType={selectedType!}
          />
        </div>
        <div className="col-span-2">
          <EditConfig configs={configs} />
        </div>
      </div>
    </div>
  )
}

export default SystemConfigRoutes
