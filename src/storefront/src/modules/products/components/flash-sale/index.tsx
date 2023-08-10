import { useEffect, useMemo, useState } from "react"

export default function FlashSale() {
  // countdown to the end of date
  const [countdown, setCountdown] = useState<number>(
    (() => {
      const now = new Date()
      const midnight = new Date(now)
      midnight.setHours(24, 0, 0, 0)

      return Math.floor(midnight.getTime() - now.getTime()) / 3600
    })()
  )

  useEffect(() => {
    let interval = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const timeLeft = useMemo(() => {
    const hour = Math.floor(countdown / 3600)
    const minute = Math.floor((countdown % 3600) / 60)
    const second = Math.floor(countdown % 60)

    return `${hour.toString().padStart(2, "0")} : ${minute
      .toString()
      .padStart(2, "0")} : ${second.toString().padStart(2, "0")}`
  }, [countdown])

  return (
    <div className="flex w-full items-center">
      <div className="inline-flex items-center w-full bg-gradient-to-r from-orange-500 to-pink-600 p-3 text-white font-extrabold">
        <span className="flex-1 w-full">Flash sale end in </span>
        <span className="bg-white rounded py-1 ml-auto text-pink-600 px-2 leading-3 font-[900]">
          {/* 00 : 00 : 00
          {countdown} */}
          {timeLeft}
        </span>
      </div>
    </div>
  )
}
