import { PropsWithChildren, createContext, useContext, useEffect } from "react"
import { Template } from "../../../types/shared"
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form"

const TemplateContext = createContext<null | {
  template?: Template

  handleSubmit: <T extends FieldValues>(
    submitHandler: SubmitHandler<T>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>
}>(null)

export type TemplateFormValues = {
  title: string
  subject: string
  description: string
  template: string
}

export const TemplateFormProvider = ({
  template,
  children,
}: PropsWithChildren<{ template?: Template }>) => {
  const methods = useForm<TemplateFormValues>({
    defaultValues: template,
  })

  const handleSubmit = (submitHandler) => {
    return methods.handleSubmit((values) => {
      submitHandler({ ...values })
    })
  }

  useEffect(() => {
    if (!template) return

    methods.reset(template)
  }, [template])

  return (
    <FormProvider {...methods}>
      <TemplateContext.Provider
        value={{
          handleSubmit,
          template,
        }}
      >
        {children}
      </TemplateContext.Provider>
    </FormProvider>
  )
}

export const useTemplateForm = () => {
  const context = useContext(TemplateContext)
  const form = useFormContext<TemplateFormValues>()

  if (context === null) {
    throw new Error(
      "useTemplateForm must be used within a TemplateFormProvider"
    )
  }

  return { ...form, ...context }
}
