import { useEffect, useMemo, useState } from "react"

export default function FlashSale() {
  const endTime = new Date(new Date().setHours(23, 59, 59, 99))
  // countdown to the end of date
  const [time, setTime] = useState(
    (() => {
      return endTime.getTime()
    })()
  )

  const countdown = () => {
    var now = new Date()

    var distance = time - now.getTime()
    if (distance <= 0) {
      setTime(0)
      return
    }
    setTime(distance)
  }

  useEffect(() => {
    let i = setInterval(countdown, 100)

    return () => {
      clearInterval(i)
    }
  }, [])

  const timeLeft = useMemo(() => {
    const hours = Math.floor((time / 1000 / 60 / 60) % 24)
      .toString()
      .padStart(2, "0")
    const minutes = Math.floor((time / 1000 / 60) % 60)
      .toString()
      .padStart(2, "0")
    const seconds = Math.floor((time / 1000) % 60)
      .toString()
      .padStart(2, "0")
    const miliseconds = Math.floor(time % 10)

    return `${hours} : ${minutes} : ${seconds}.${miliseconds}`
  }, [time])

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
