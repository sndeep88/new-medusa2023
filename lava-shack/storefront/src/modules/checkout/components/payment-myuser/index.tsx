import { IS_BROWSER } from "@lib/constants"
import {
  CardInfomation,
  CheckoutFormValues,
  useCheckout,
} from "@lib/context/checkout-context"
import Input from "@modules/common/components/input"
import Security from "@modules/common/icons/security"
import Lock from "@modules/common/icons/lock"
import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import Info from "@modules/common/icons/info"
import clsx from "clsx"
import { Combobox, Transition } from "@headlessui/react"
import Select from "@modules/common/components/select"
import moment from "moment"

const base_months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
]

const PaymentMyUser = ({ setDone }: { setDone: (val: boolean) => void }) => {
  // const { cart } = useCart()
  const { cart, setCardElementId, mpay } = useCheckout()
  const { register, formState, control, watch, setValue } =
    useFormContext<CheckoutFormValues>()
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // console.log({ MyUser: window.MyUserPay, mpay })
    if (!IS_BROWSER) return
    if (!window.MyUserPay) return
    if (!mpay || mpay.implementDirect) return

    const MyUserPay = window.MyUserPay
    const pkMyuser = mpay?.publicKey ?? ""
    // console.log({ pkMyuser })

    const amount = cart?.total ?? 0

    MyUserPay.setKey(pkMyuser)

    const elementId = MyUserPay.createElement("#custom", { amount: amount })

    // console.log({ elementId })

    setCardElementId(elementId)
  }, [IS_BROWSER, mpay, cart?.total])

  let { errors } = formState

  function cc_format(value: string) {
    // console.log({ value })
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    const parts = v.match(/.{1,4}/g) || []
    // console.log({ parts })

    return parts.slice(0, 4).join(" ")
  }

  function exp_date_format(date: string) {
    // console.log({ date })

    const d = date.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    const parts = d.match(/.{1,2}/g) || []
    // console.log({ parts })

    return parts.slice(0, 2).join("/")
  }

  const years = useMemo(() => {
    const curr = new Date().getFullYear()

    const start = curr
    const end = curr + 20

    return Array.from(
      { length: end - start + 1 },
      (value, index) => start + index
    )
  }, [])

  const [expMon, expYear] = watch(["card_expMon", "card_expYear"])
  const months = useMemo(() => {
    return base_months
  }, [])

  const isDateInValid = useMemo(() => {
    const exp = moment.utc(`${expYear}-${expMon}`, "YYYY-MM").endOf("M")

    const valid = moment.utc().startOf("M")
    return exp.isBefore(valid, "d")
  }, [expMon, expYear])

  return (
    <div className="row mt-2">
      {mpay?.implementDirect ? (
        <>
          <div className="col-md-12 mb-2 relative">
            <Controller
              name="card_number"
              rules={{ required: "Card number is required" }}
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
          <div className="col-md-6 mb-2 relative">
            <Controller
              name="card_expMon"
              control={control}
              rules={{ required: "Expiration date is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={months.map((m) => ({
                    value: m.toString(),
                    label: m.toString(),
                  }))}
                  label="Expire Month"
                />
              )}
            />
          </div>
          <div className="col-md-6 mb-2 relative">
            <Controller
              name="card_expYear"
              control={control}
              rules={{ required: "Expiration date is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={years.map((m) => ({
                    value: m.toString(),
                    label: m.toString(),
                  }))}
                  label="Expire Year"
                />
              )}
            />
          </div>
          {isDateInValid && (
            <span className="w-full mb-2 -mt-2 italic text-red-500 text-sm">
              * Please check the expiry dates
            </span>
          )}
          <div className="col-md-12 relative">
            <Controller
              name="card_cvc"
              control={control}
              rules={{ required: "Security code is required" }}
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
        </>
      ) : null}

      <div
        className={clsx(
          "py-1 pb-2",
          mpay && mpay.implementDirect ? "hidden" : "visible"
        )}
      >
        <div
          id="custom"
          className="border rounded py-2 px-3"
          ref={cardRef}
        ></div>
      </div>

      <div className="col-12 text-start inline-flex ">
        <Security size={16} strokeWidth={0.5} />
        Card information is guaranteed to be safe on PCI DSS standards.
      </div>
    </div>
  )
}
export default PaymentMyUser
