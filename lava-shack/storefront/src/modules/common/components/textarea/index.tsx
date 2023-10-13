import { ErrorMessage } from "@hookform/error-message"
import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"
import clsx from "clsx"
import React, { useEffect, useImperativeHandle, useState } from "react"
import { get } from "react-hook-form"

type InputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, InputProps>(
  (
    {
      name,
      label,
      errors,
      touched,
      required,
      placeholder,
      className,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLTextAreaElement>(null)
    const [showPassword, setShowPassword] = useState(false)

    useImperativeHandle(ref, () => inputRef.current!)

    const hasError = get(errors, name) && get(touched, name)

    return (
      <>
        <div className="input ">
          <textarea
            // type={inputType}
            name={name}
            className={clsx(
              "form-control",
              { peer: label !== undefined },
              {
                "border-rose-500 focus:border-rose-500": hasError,
              },
              className
            )}
            cols={5}
            {...props}
            placeholder={label ? " " : placeholder}
            ref={inputRef}
          />
          {label && (
            <label htmlFor={name} onClick={() => inputRef.current?.focus()}>
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
  }
)

Textarea.displayName = "Textarea"

export default Textarea
