import { onlyUnique } from "@lib/util/only-unique"
import { ProductOption } from "@medusajs/medusa"
import clsx from "clsx"
import React, { useEffect } from "react"

type OptionSelectProps = {
  option: ProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
}) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

  // useEffect(() => {
  //   console.log({ filteredOptions, current })
  // }, [current])

  return (
    <>
      <h5 className="prod-lable">Select {title}</h5>
      <div className="varient-options">
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => {
                updateOption({ [option.id]: v })
              }}
              key={v}
              className={clsx("varient-items", v === current && "active")}
            >
              {v}
            </button>
          )
        })}
      </div>
    </>
  )
}

export default OptionSelect
