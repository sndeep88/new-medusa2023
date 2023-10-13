import { IconProps } from "types/icon"

const SecurePaymentIcon: React.FC<IconProps> = ({
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
      <rect
        x="2.57143"
        y="8.42859"
        width="18.8571"
        height="13.7143"
        rx="0.857143"
        strokeWidth="1.5"
        stroke={color}
      ></rect>
      <path
        d="M18 8.42859C18 5.11488 15.3137 2.42859 12 2.42859C8.68629 2.42859 6 5.11488 6 8.42859"
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke={color}
      ></path>
      <circle
        cx="12"
        cy="13.5714"
        r="1.71429"
        fill="currentColor"
        stroke={color}
      ></circle>
      <path
        d="M12 13.5714V17"
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke={color}
      ></path>
    </svg>
  )
}

export default SecurePaymentIcon
