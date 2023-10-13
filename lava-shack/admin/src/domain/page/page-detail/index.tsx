import { useAdminCustomQuery } from "medusa-react"
import { useParams } from "react-router-dom"
import Breadcrumb from "../../../components/molecules/breadcrumb"
import { PageFormProvider } from "../components/page-form/form/page-form-context"
import PageForm from "../components/page-form"

const PageDetail = () => {
  const { id } = useParams()

  const { data, isLoading } = useAdminCustomQuery(`/pages/${id}`, ["pages", id])

  return (
    <div className="pb-xlarge">
      <Breadcrumb
        currentPage="Edit page"
        previousBreadcrumb="Pages"
        previousRoute="/a/pages"
      />

      {!isLoading && data.page ? (
        <PageFormProvider page={data.page}>
          <PageForm viewType="update" />
        </PageFormProvider>
      ) : null}
    </div>
  )
}

export default PageDetail
