import { useAdminCustomPost } from "medusa-react"
import Button from "../../../components/fundamentals/button"
import SideModal from "../../../components/molecules/modal/side-modal"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import InputField from "../../../components/molecules/input"
import CrossIcon from "../../../components/fundamentals/icons/cross-icon"
import { forwardRef, useEffect } from "react"
import useNotification from "../../../hooks/use-notification"
import { getErrorMessage } from "../../../utils/error-messages"
import RadioGroup from "../../../components/organisms/radio-group"
import clsx from "clsx"
import { ProviderType } from "../types"
import Switch from "../../../components/atoms/switch"

type FormValues = {
  configs: {
    key: string
    value: string
    key_name: string
    required: boolean
    dataType: string
  }[]
}

const specialKeys = {
  square_environment: {
    options: ["sandbox", "production"],
    component: SquareEnvSelect,
  },
}

const extra_actions = {
  [ProviderType.SQUARE]: (
    <span>
      To get Square App info{" "}
      <a
        href="https://squareup.com/dashboard/apps/my-applications"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        click here
      </a>
    </span>
  ),
  [ProviderType.STRIPE]: (
    <span>
      To get Stripe Api config info{" "}
      <a
        href="https://dashboard.stripe.com/test/apikeys"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        click here
      </a>
    </span>
  ),
}

function EditSideModal({ open, onClose, title, configs, provider }: any) {
  const updateConfig = useAdminCustomPost("/system-config", ["system-config"])

  const { register, control, reset, handleSubmit, formState, setValue } =
    useForm<FormValues>({
      defaultValues: {
        configs,
      },
    })

  useEffect(() => {
    setValue("configs", configs)
  }, [configs])

  const closeAndReset = () => {
    reset({ configs })
    onClose()
  }

  const notifcation = useNotification()
  const onSubmit = (values: FormValues) => {
    updateConfig.mutate(values, {
      onSuccess: () => {
        notifcation("Success", "System config updated", "success")
      },
      onError: (error) => {
        notifcation("Error", getErrorMessage(error), "error")
      },
    })
    closeAndReset()
  }

  const { fields } = useFieldArray({
    name: "configs",
    control: control,
  })

  const { isDirty } = formState

  const ViewField = forwardRef<any, any>(({ type, ...props }, ref) => {
    switch (type) {
      case "boolean":
        const { value, onChange, ...rest } = props
        return (
          <div className="flex w-full items-center justify-between">
            <h3 className="inter-base-semibold mb-2xsmall">{props.label}</h3>
            <Controller
              name={props.name}
              control={control}
              render={({ field: { value, onChange } }) => (
                <Switch
                  checked={value === "true"}
                  onCheckedChange={(val) => onChange(String(val))}
                />
              )}
            />
          </div>
        )
      case "string":
      default:
        return <InputField {...props} ref={ref} />
    }
  })

  const ValueField = ({ type, ...props }) => {
    if (specialKeys[type]) {
      const { component: Component, ...rest } = specialKeys[type]
      return <Component {...rest} {...props} control={control} />
    }

    return (
      <InputField
        {...props}
        {...register(props.name, {
          required: props.required,
        })}
      />
    )
  }

  return (
    <SideModal isVisible={open} close={closeAndReset}>
      <div className="flex h-full flex-col justify-between p-6">
        <div className="flex items-center justify-between">
          <h3 className="inter-large-semibold flex items-center gap-2 text-xl text-gray-900">
            {title}
          </h3>
          <Button
            variant="secondary"
            className="h-8 w-8 p-2"
            onClick={closeAndReset}
          >
            <CrossIcon size={20} className="text-grey-50" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="contents">
          <div className="flex-grow">
            {fields.map((field, idx) => {
              return (
                <div className="my-6" key={idx}>
                  {/* <ValueField
                    type={field.key}
                    label={field.key_name}
                    required={field.required}
                    {...register(`configs.${idx}.value` as const, {
                      required: field.required,
                    })}
                  /> */}
                  <ViewField
                    type={field.dataType}
                    label={field.key_name}
                    required={field.required}
                    {...register(`configs.${idx}.value` as const, {
                      required: field.required,
                    })}
                  />
                </div>
              )
            })}
          </div>

          <div className="ư-full flex justify-between gap-2">
            <div className="inline-flex py-1 text-small">
              {extra_actions[provider] && (extra_actions[provider] as any)}
            </div>
            <div className="flex items-center justify-end gap-x-xsmall">
              <Button
                variant="secondary"
                size="small"
                type="button"
                onClick={closeAndReset}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="small"
                type="submit"
                loading={updateConfig.isLoading}
                disabled={updateConfig.isLoading || !isDirty}
              >
                Save and close
              </Button>
            </div>
          </div>
        </form>
      </div>
    </SideModal>
  )
}

function SquareEnvSelect({ control, name, options, ...props }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <div className="flex items-center justify-between py-3">
            <label
              htmlFor={name}
              className="inter-small-semibold flex w-full items-center text-grey-50"
            >
              {props.label}
            </label>

            <div className=" space-x-1 rounded-full bg-gray-300 px-2 py-1">
              {options.map((opt) => (
                <span
                  key={opt}
                  className={clsx(
                    "rounded-full px-3 py-0.5 transition-all duration-300 hover:cursor-pointer",
                    {
                      ["bg-white text-rose-400 drop-shadow-lg"]: opt === value,
                    }
                  )}
                  onClick={() => onChange(opt)}
                >
                  {opt}
                </span>
              ))}
            </div>
          </div>
        )
      }}
    />
  )
}

export default EditSideModal
