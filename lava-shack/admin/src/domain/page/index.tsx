import { Route, Routes, useNavigate } from "react-router-dom"
import BodyCard from "../../components/organisms/body-card"
import PlusIcon from "../../components/fundamentals/icons/plus-icon"
import TableViewHeader from "../../components/organisms/custom-table-header"
import New from "./new"
import PageTable from "./page-table"
import PageDetail from "./page-detail"

const PageIndex = () => {
  const navigate = useNavigate()

  const actionables = [
    {
      label: "Add page",
      onClick: () => navigate(`/a/pages/new`),
      icon: <PlusIcon size={20} />,
    },
  ]
  return (
    <div className="flex h-full flex-col">
      <div className="flex w-full grow flex-col">
        <BodyCard
          actionables={actionables}
          customHeader={<TableViewHeader views={["Pages"]} />}
          className="h-fit"
        >
          <PageTable />
        </BodyCard>
      </div>
    </div>
  )
}

function Page() {
  return (
    <Routes>
      <Route index element={<PageIndex />} />
      <Route path="/new" element={<New />} />
      <Route path="/:id" element={<PageDetail />} />
    </Routes>
  )
}
export default Page
