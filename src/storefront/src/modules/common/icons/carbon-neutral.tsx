import { IconProps } from "types/icon"

const CarbonNeutalIcon: React.FC<IconProps> = ({
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
        d="M6.17085 18.5595C-0.189561 12.1991 8.82956 1.08353 20.5595 4.17085C23.6686 16.1197 12.5307 24.9194 6.17085 18.5595Z"
        strokeWidth="1.5"
        stroke={color}
      ></path>
      <path
        d="M3.18121 21.5628L20.5623 4.1817"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color}
      ></path>
      <path
        d="M13.3555 4.1817V11.3885H20.5623"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color}
      ></path>
    </svg>
  )
}

export default CarbonNeutalIcon
