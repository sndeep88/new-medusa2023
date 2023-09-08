import { IS_BROWSER } from "@lib/constants"
import { CardInfomation, useCheckout } from "@lib/context/checkout-context"
import Input from "@modules/common/components/input"
import Security from "@modules/common/icons/security"
import Lock from "@modules/common/icons/lock"
import { useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import Info from "@modules/common/icons/info"

const pkMyuser = process.env.NEXT_PUBLIC_MYUSER_PUBLIC_KEY ?? ""

const PaymentMyUser = ({ setDone }: { setDone: (val: boolean) => void }) => {
  // const { cart } = useCart()
  const { cart, setCardElementId } = useCheckout()
  const { register, formState, control } = useFormContext<CardInfomation>()

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

  let { errors } = formState

  function cc_format(value: string) {
    console.log({ value })
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    const parts = v.match(/.{1,4}/g) || []
    // console.log({ parts })

    return parts.slice(0, 4).join(" ")
  }

  function exp_date_format(date: string) {
    console.log({ date })

    const d = date.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    const parts = d.match(/.{1,2}/g) || []
    // console.log({ parts })

    return parts.slice(0, 2).join("/")
  }

  return (
    <div className="row mt-2">
      <div className="col-md-12 mb-2 relative">
        <Controller
          name="card_number"
          control={control}
          render={({ field: { onChange, value, ...fields } }) => {
            return (
              <Input
                label="Card Number"
                errors={errors}
                {...fields}
                onChange={(ev) => {
                  const val = ev.currentTarget.value
                  onChange(cc_format(val))
                }}
                value={value}
                className="pe-4"
                suffix={
                  <button
                    type="button"
                    tabIndex={-1}
                    className="btn-link top-1/2 translate-y-1"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="All transactions are  secure and encrypted."
                  >
                    <Lock size={16} strokeWidth={0.15} />
                  </button>
                }
              />
            )
          }}
        />
      </div>
      <div className="col-md-12 mb-2 relative">
        <Input
          label="Cardholder's Name"
          {...register("card_name")}
          className="uppercase"
          suffix={
            <button
              type="button"
              tabIndex={-1}
              className="btn-link top-1/2 translate-y-1"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="All transactions are  secure and encrypted."
            >
              <Info size={18} strokeWidth={0.15} />
            </button>
          }
        />
      </div>
      <div className="col-md-12 mb-2 relative">
        <Controller
          name="card_expDate"
          control={control}
          render={({ field: { onChange, value, ...fields } }) => (
            <Input
              label="Expiration Date (MM/YY)"
              {...fields}
              onChange={(ev) => {
                const val = ev.currentTarget.value
                onChange(exp_date_format(val))
              }}
              value={value}
            />
          )}
        />
      </div>
      <div className="col-md-12 relative">
        <Controller
          name="card_cvc"
          control={control}
          render={({ field: { onChange, value, ...fields } }) => (
            <Input
              label="Security Code"
              {...fields}
              onChange={(ev) => {
                var val = ev.currentTarget.value
                val = val.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
                onChange(val.slice(0, 4))
              }}
              value={value}
              suffix={
                <button
                  type="button"
                  tabIndex={-1}
                  className="btn-link top-1/2 translate-y-1"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="All transactions are  secure and encrypted."
                >
                  <Info size={18} strokeWidth={0.15} />
                </button>
              }
            />
          )}
        />
      </div>

      <div className="col-12 text-start inline-flex ">
        <Security size={16} strokeWidth={0.5} />
        Card information is guaranteed to be safe on PCI DSS standards.
      </div>
    </div>
  )
}
export default PaymentMyUser
