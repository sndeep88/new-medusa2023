import { ErrorMessage } from "@hookform/error-message"
import clsx from "clsx"
import { get } from "lodash"
import { forwardRef, useImperativeHandle, useRef } from "react"

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  options: Array<{ value: any; label: string }>
}

export default forwardRef<HTMLSelectElement, SelectProps>(function Select(
  props,
  ref
) {
  let { name, label, className, errors, touched, required, options, ...rest } =
    props
  const selectRef = useRef<HTMLSelectElement>(null)

  const hasError = get(errors, name) && get(touched, name)
  useImperativeHandle(ref, () => selectRef.current!)

  return (
    <>
      <div className="select relative z-10 w-full text-base-regular">
        <select
          name={name}
          className={clsx("form-control", className)}
          {...rest}
          ref={selectRef}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {label && (
          <label htmlFor={name} onClick={() => selectRef.current?.focus()}>
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
        )}
      </div>
      {hasError && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => {
            return (
              <div className="pt-1 pl-2 text-rose-500 text-xsmall-regular">
                <span>{message}</span>
              </div>
            )
          }}
        />
      )}
    </>
  )
})
