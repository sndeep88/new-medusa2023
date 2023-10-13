import { useNavigate, useParams } from "react-router-dom"
import Button from "../../../../../components/fundamentals/button"
import CrossIcon from "../../../../../components/fundamentals/icons/cross-icon"
import { useAdminCustomPost, useMedusa } from "medusa-react"
import { BaseSyntheticEvent } from "react"
import { PageFormValue, usePageForm } from "../form/page-form-context"
import useNotification from "../../../../../hooks/use-notification"
import { getErrorMessage } from "../../../../../utils/error-messages"
import axios from "axios"

type HeaderAction = {
  label: string
  onClick:
    | (() => void)
    | ((e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>)
}

export default function FormHeader(props: {
  viewType: "create" | "update"
  onClose?: () => void
}) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { handleSubmit } = usePageForm()
  const notification = useNotification()

  const closeForm = () => {
    if (props.viewType !== "create" && props.onClose) {
      props.onClose()
    } else {
      navigate(-1)
    }
  }

  const createPage = useAdminCustomPost("/pages", ["pages"])
  const updatePage = useAdminCustomPost(`/pages/${id}`, ["pages", id])

  const onPublish = async (values: PageFormValue) => {
    try {
      await createPage.mutateAsync(values)
      notification("Success", "Page created", "success")
    } catch (e) {
      notification("Error", getErrorMessage(e), "error")
    } finally {
      navigate(`/a/pages`)
    }
  }

  const onUpdate = async (values: PageFormValue) => {
    try {
      await updatePage.mutateAsync(values)
      notification("Success", "Page updated", "success")
    } catch (e) {
      notification("Error", getErrorMessage(e), "error")
    } finally {
      navigate(`/a/pages`)
    }
  }

  let mainAction: HeaderAction

  switch (props.viewType) {
    case "create":
      mainAction = {
        label: "Publish",
        onClick: handleSubmit(onPublish),
      }
      break
    case "update":
      mainAction = {
        label: "Update",
        onClick: handleSubmit(onUpdate),
      }
      break
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
        {/* <Button
          onClick={secondaryAction.onClick}
          size="small"
          variant="ghost"
          className="rounded-rounded border"
        >
          {secondaryAction.label}
        </Button> */}
        <Button
          size="small"
          variant="primary"
          onClick={mainAction.onClick}
          className="rounded-rounded"
        >
          {mainAction.label}
        </Button>
      </div>
    </div>
  )
}
