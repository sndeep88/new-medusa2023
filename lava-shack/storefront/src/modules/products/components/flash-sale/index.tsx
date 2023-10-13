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
      .toString()
      .padStart(2, "0")

    return `${hours}:${minutes}:${seconds}.${miliseconds}`
  }, [time])

  return (
    <div className="countdown d-none d-md-block">
      <span className="sale-label">Hurry up! Sale Ends in</span>
      <div
        style={{
          direction: "ltr",
        }}
        className="timeout_isolate"
      >
        {timeLeft}
      </div>
    </div>
  )
}
