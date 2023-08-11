import { IS_BROWSER } from "@lib/constants"
import { useCheckout } from "@lib/context/checkout-context"
import { useEffect, useState } from "react"

const pkMyuser = process.env.NEXT_PUBLIC_MYUSER_PUBLIC_KEY ?? ""

const PaymentMyUser = ({ setDone }: { setDone: (val: boolean) => void }) => {
  // const { cart } = useCart()
  const { cart, setCardElementId } = useCheckout()

  useEffect(() => {
    if (!IS_BROWSER) return
    if (!window.MyUserPay) return

    const MyUserPay = window.MyUserPay
    // console.log({ MyUserPay })

    const amount = cart?.total ?? 0

    MyUserPay.setKey(pkMyuser)
    const elementId = MyUserPay.createElement("#custom", { amount: amount })

    // console.log({ elementId })

    setCardElementId(elementId)
  }, [IS_BROWSER])

  return (
    <div>
      <div className="flex flex-col relative w-full">
        <div
          id="custom"
          className="border border-gray-300 rounded-md w-full bg-white px-3 py-2"
        ></div>

        {/* <div className="md:w-1/5 ml-auto flex items-end justify-end mt-2 relative gap-x-4">
          <Button onClick={saveCard} disabled={isSaving || isSaved}>
            {isSaved ? "Saved" : isSaving ? <Spinner /> : "Save card"}
          </Button>
        </div> */}
      </div>
    </div>
  )
}
export default PaymentMyUser
