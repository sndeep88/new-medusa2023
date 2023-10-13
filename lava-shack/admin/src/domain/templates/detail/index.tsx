import { useParams } from "react-router-dom"
import BackButton from "../../../components/atoms/back-button"
import BodyCard from "../../../components/organisms/body-card"
import { useAdminCustomQuery } from "medusa-react"
import Breadcrumb from "../../../components/molecules/breadcrumb"
import { TemplateFormProvider } from "../form/template-form-content"
import TemplateForm from "../form/template-form"

function Detail() {
  const { id } = useParams()

  const { data, isLoading } = useAdminCustomQuery(`/templates/${id}`, [
    "templates",
    id,
  ])

  return !isLoading && data.template ? (
    <TemplateFormProvider template={data.template}>
      <TemplateForm />
    </TemplateFormProvider>
  ) : null
}
export default Detail
