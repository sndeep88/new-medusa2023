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
    <div className="flex flex-col gap-y-3">
      <span className="text-xl text-gray-900 font-semibold">
        Select {title}
      </span>
      <div className="flex flex-wrap items-center justify-start gap-2">
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => {
                updateOption({ [option.id]: v })
              }}
              key={v}
              className={clsx(
                "px-4 py-2 border-2 border-gray-200 rounded-full text-gray-800 transition-all duration-200 hover:bg-gray-200",
                v === current && " !border-gray-900 font-semibold"
              )}
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
