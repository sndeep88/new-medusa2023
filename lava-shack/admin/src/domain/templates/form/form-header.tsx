import { useNavigate, useParams } from "react-router-dom"
import Button from "../../../components/fundamentals/button"
import CrossIcon from "../../../components/fundamentals/icons/cross-icon"
import useNotification from "../../../hooks/use-notification"
import { TemplateFormValues, useTemplateForm } from "./template-form-content"
import { useAdminCustomPost } from "medusa-react"

function FormHeader() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { handleSubmit, setValue, template } = useTemplateForm()
  const notification = useNotification()

  const closeForm = () => {
    navigate(-1)
  }

  const updateTemplate = useAdminCustomPost(`/templates/${id}`, [
    "templates",
    id,
  ])
  const defaultTemplate = useAdminCustomPost(`/templates/${id}/default`, [
    "templates",
    id,
  ])

  const onSave = async (values: TemplateFormValues) => {
    updateTemplate.mutate(values, {
      onSuccess: () => {
        notification("Success", "Template updated", "success")
      },
      onError: (error) => {
        notification("Error", error.message, "error")
      },
    })

    closeForm()
  }

  const onReset = async () => {
    if (!template) return

    setValue("template", template.default_template)

    await defaultTemplate.mutateAsync({})
  }

  return (
    <div className="flex w-full justify-between px-8 medium:w-8/12">
      <Button
        size="small"
        variant="ghost"
        onClick={closeForm}
        className="h-8 w-8 rounded-rounded border"
      >
        <CrossIcon size={20} />
      </Button>

      <div className="flex gap-x-small">
        <Button
          size="small"
          variant="secondary"
          onClick={onReset}
          className="rounded-rounded"
        >
          Restore Default
        </Button>
        <Button
          size="small"
          variant="primary"
          onClick={handleSubmit(onSave)}
          className="rounded-rounded"
        >
          Save
        </Button>
      </div>
    </div>
  )
}
export default FormHeader
