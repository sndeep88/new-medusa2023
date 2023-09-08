import Spinner from "@modules/common/icons/spinner"
import clsx from "clsx"
import Link from "next/link"
import React, { forwardRef } from "react"

type ButtonProps = {
  isLoading?: boolean
  variant?: "primary" | "secondary" | "light"
  href?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    isLoading = false,
    variant = "primary",
    href,
    ...props
  },
  ref
) {
  return (
    <button
      className={clsx(
        "flex items-center justify-center px-5 py-[10px] font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm",
        {
          "text-white bg-gray-900 border-gray-900 ": variant === "secondary",
          "text-white bg-primary": variant === "primary",
          "text-gray-900 bg-gray-200 hover:bg-gray-900 hover:text-white":
            variant === "light",
        },
        className
      )}
      {...props}
      ref={ref}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
})
