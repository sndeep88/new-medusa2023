import { IconProps } from "types/icon"

const FreeReturnIcon: React.FC<IconProps> = ({
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
    >
      <path
        d="M18 3.64466C16.3112 2.4298 14.2392 1.71429 12 1.71429C6.31936 1.71429 1.71429 6.31937 1.71429 12C1.71429 17.6807 6.31936 22.2857 12 22.2857C17.6806 22.2857 22.2857 17.6807 22.2857 12C22.2857 10.636 22.0202 9.33399 21.5381 8.14287"
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke={color}
      ></path>
      <path
        d="M6.85714 12.4285L10.2857 15.8571L22.2857 3.85712"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color}
      ></path>
    </svg>
  )
}

export default FreeReturnIcon
