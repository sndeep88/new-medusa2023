import { IconProps } from "types/icon"

const FreeShippingIcon: React.FC<IconProps> = ({
  size = "20",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <circle
        cx="12"
        cy="12"
        r="10.2857"
        strokeWidth="1.5"
        stroke={color}
      ></circle>
      <ellipse
        cx="12"
        cy="12"
        rx="4.28571"
        ry="10.2857"
        strokeWidth="1.5"
        stroke={color}
      ></ellipse>
      <path
        d="M3.42857 6.42859H20.5714"
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke={color}
      ></path>
      <path
        d="M1.71429 12H22.2857"
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke={color}
      ></path>
      <path
        d="M3.42857 17.5714H20.5714"
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke={color}
      ></path>
    </svg>
  )
}

export default FreeShippingIcon
