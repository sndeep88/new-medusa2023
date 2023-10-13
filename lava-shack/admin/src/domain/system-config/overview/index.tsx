import { useAdminCustomQuery } from "medusa-react"
import { useEffect, useMemo, useState } from "react"
import SystemConfig, { ConfigType } from "../types"
import Section from "../../../components/organisms/section"
import RadioGroup from "../../../components/organisms/radio-group"
import TypeCard from "./type-card"

type Props = {
  types: ConfigType[]
  handleChange: (type: ConfigType) => void
  selectedType: ConfigType
}

function Overview({ types, selectedType, handleChange }: Props) {
  return (
    <>
      <Section title="Configs" className="h-full">
        <div className="mt-large">
          <RadioGroup.Root value={selectedType} onValueChange={handleChange}>
            {types?.map((type, index) => (
              <TypeCard key={index} type={type} />
            ))}
          </RadioGroup.Root>
        </div>
      </Section>
    </>
  )
}

export default Overview
