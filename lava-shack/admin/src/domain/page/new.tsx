import PageForm from "./components/page-form"
import { PageFormProvider } from "./components/page-form/form/page-form-context"

function NewPage() {
  return (
    <PageFormProvider>
      <PageForm viewType="create" />
    </PageFormProvider>
  )
}
export default NewPage
