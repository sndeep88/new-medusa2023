import clsx from "clsx"

const Radio = ({ checked }: { checked: boolean }) => {
  return (
    <div className="relative">
      <div
        className={clsx(
          "relative h-3 w-3 cursor-pointer rounded-full ring-[1px] ring-offset-0 bg-white border-2 border-slate-200 text-blue-500 transition-all",
          { "border-blue-500 ring-blue-500": checked },
          { " ring-slate-700": !checked }
        )}
      >
        <div
          className={clsx(
            "pointer-events-none absolute top-2/4 left-3/5 -translate-y-2/4 -translate-x-3/5 text-blue-500 opacity-0 transition-opacity",
            {
              "opacity-100": checked,
            }
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-2 w-2"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Radio
