import { IS_BROWSER } from "@lib/constants"
import { useSessionStorage } from "@lib/hooks/useSessionStorage"
import Button from "@modules/common/components/button"
import Spinner from "@modules/common/icons/spinner"
import { useCart } from "medusa-react"
import { MyUserClient } from "myuserpay"
import { useCallback, useEffect, useRef, useState } from "react"

const pkMyuser = process.env.NEXT_PUBLIC_MYUSER_PUBLIC_KEY ?? ""

const PaymentMyUser = ({ setDone }: { setDone: (val: boolean) => void }) => {
  const { cart } = useCart()

  const [elementId, setElementId] = useState<number | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (!IS_BROWSER) return

    const MyUserPay = window.MyUserPay
    console.log({ MyUserPay })

    const amount = cart?.total ?? 0

    MyUserPay.setKey(pkMyuser)
    const elementId = MyUserPay.createElement("#custom", { amount: amount })

    console.log({ elementId })

    setElementId(elementId)
  }, [IS_BROWSER])

  const saveCard = () => {
    if (!elementId || !IS_BROWSER) return
    setIsSaving(true)

    const MyUserPay = window.MyUserPay

    MyUserPay.createElementToken(elementId, async function (data: any) {
      if (data.status) {
        if (isSaved) {
          window.sessionStorage.setItem("c_myuser_token", data.token)

          setIsSaving(false)
          return
        }

        var res = await fetch("/api/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(data),
        })
        var json = await res.json()
        window.sessionStorage.setItem("c_myuser_token", json.src_id)
        // setToken(json.src_id)

        setIsSaving(false)
        setIsSaved(true)
        setDone(true)
      } else {
        console.error(data)
        setIsSaving(false)
      }
    })
  }

  return (
    <div>
      <div className="flex flex-col relative w-full">
        <div
          id="custom"
          className="border border-gray-300 rounded-md w-full bg-white px-3 py-2"
        ></div>

        <div className="md:w-1/5 ml-auto flex items-end justify-end mt-2 relative gap-x-4">
          <Button onClick={saveCard} disabled={isSaving || isSaved}>
            {isSaved ? "Saved" : isSaving ? <Spinner /> : "Save card"}
          </Button>
        </div>
      </div>
    </div>
  )
}
export default PaymentMyUser
