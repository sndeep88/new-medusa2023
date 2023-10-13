import { PropsWithChildren, createContext, useContext } from "react"
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form"
import { Page, PageStatus } from "../../../../../types/shared"

export type PageFormValue = {
  title: string | null
  status: PageStatus | null
  content: string | null
  slug: string | null
}

const PageFormContext = createContext<null | {
  handleSubmit: <T extends FieldValues>(
    submitHandler: SubmitHandler<T>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>
}>(null)

export const PageFormProvider = ({
  children,
  page,
}: PropsWithChildren<{ page?: Page }>) => {
  const methods = useForm<PageFormValue>({
    defaultValues: page ?? {
      title: "",
      content: "<p>Enter page content</p>",
    },
  })

  const handleSubmit = (submitHandler) => {
    return methods.handleSubmit((values) => {
      submitHandler({ ...values })
    })
  }

  return (
    <FormProvider {...methods}>
      <PageFormContext.Provider
        value={{
          handleSubmit,
        }}
      >
        {children}
      </PageFormContext.Provider>
    </FormProvider>
  )
}

export const usePageForm = () => {
  const context = useContext(PageFormContext)
  const form = useFormContext<PageFormValue>()

  if (context === null) {
    throw new Error("usePageForm must be used within a PageFormProvider")
  }
  return { ...form, ...context }
}
