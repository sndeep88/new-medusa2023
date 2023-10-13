export default function ProductStock() {
  return (
    <div className="stockBox_item">
      <svg
        width="1.15em"
        height="1.15em"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.00004 1C6.34319 1 5.00004 2.34315 5.00004 4L2.88071 4C2.67337 4 2.5004 4.15843 2.48224 4.36497L1.63829 13.965C1.61773 14.1988 1.80201 14.4 2.03675 14.4H13.9633C14.1981 14.4 14.3824 14.1988 14.3618 13.965L13.5178 4.36497C13.4997 4.15843 13.3267 4 13.1194 4L11 4C11 2.34315 9.6569 1 8.00004 1ZM9.80004 5.2V7.2H11V5.2H12.3866L13.0899 13.2H2.91016L3.61346 5.2H5.00004V7.2H6.20004V5.2H9.80004ZM9.80004 4L6.20004 4C6.20004 3.00589 7.00593 2.2 8.00004 2.2C8.99415 2.2 9.80004 3.00589 9.80004 4Z"
          fill="currentColor"
        ></path>
      </svg>
      <div>
        <span className="undefined">Only</span>
        <span className="number notranslate"> 5 </span>
        <span className="undefined">left in stock</span>
      </div>
    </div>
  )
}
