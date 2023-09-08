import { IconProps } from "types/icon"

export default function Cart2({
  size = 21,
  color = "currentColor",
  ...attributes
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
      {...attributes}
    >
      <path
        d="M14.0001 13C14.5524 13 15.0001 12.5523 15.0001 12C15.0001 11.4477 14.5524 11 14.0001 11H8.00015C7.44786 11 7.00015 11.4477 7.00015 12C7.00015 12.5523 7.44786 13 8.00015 13H14.0001Z"
        fill="currentColor"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.50504 11.0996L1.50644 11.1128L2.00512 16.0995C2.05624 16.6107 2.4864 17 3.00015 17H19.0002C19.5139 17 19.9441 16.6107 19.9952 16.0995L20.9952 6.0995C21.0233 5.81838 20.9312 5.53848 20.7416 5.329C20.552 5.11951 20.2827 5 20.0002 5H2.90505L2.49511 0.900571C2.44016 0.351027 1.95011 -0.0499167 1.40057 0.00503759C0.851027 0.0599919 0.450083 0.550035 0.505038 1.09958L1.50504 11.0996ZM3.10514 7L3.90514 15H18.0952L18.8952 7H3.10514Z"
        fill="currentColor"
      ></path>
      <path
        d="M8.00015 19.5C8.00015 20.3284 7.32858 21 6.50015 21C5.67172 21 5.00015 20.3284 5.00015 19.5C5.00015 18.6716 5.67172 18 6.50015 18C7.32858 18 8.00015 18.6716 8.00015 19.5Z"
        fill="currentColor"
      ></path>
      <path
        d="M15.5001 21C16.3286 21 17.0001 20.3284 17.0001 19.5C17.0001 18.6716 16.3286 18 15.5001 18C14.6717 18 14.0001 18.6716 14.0001 19.5C14.0001 20.3284 14.6717 21 15.5001 21Z"
        fill="currentColor"
      ></path>
    </svg>
  )
}