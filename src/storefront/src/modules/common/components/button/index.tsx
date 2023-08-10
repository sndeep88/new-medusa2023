import Spinner from "@modules/common/icons/spinner"
import clsx from "clsx"
import Link from "next/link"
import React from "react"

type ButtonProps = {
  isLoading?: boolean
  variant?: "primary" | "secondary" | "light"
  href?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>

const Button = ({
  children,
  className,
  isLoading = false,
  variant = "primary",
  href,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "flex items-center justify-center px-5 py-[10px] font-medium transition-colors duration-200 disabled:opacity-50 rounded-md disabled:cursor-not-allowed text-sm",
        {
          "text-white bg-gray-900 border-gray-900 hover:text-gray-900":
            variant === "primary",
          "text-white bg-yellow-500 hover:bg-gray-900 disabled:hover:bg-yellow-500":
            variant === "secondary",
          "text-gray-900 bg-gray-200 hover:bg-gray-900 hover:text-white":
            variant === "light",
        },
        className
      )}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
}

export default Button
