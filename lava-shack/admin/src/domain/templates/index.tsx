import { memo, useMemo, useState } from "react"
import BodyCard from "../../components/organisms/body-card"
import TableViewHeader from "../../components/organisms/custom-table-header"
import useToggleState from "../../hooks/use-toggle-state"
import Fade from "../../components/atoms/fade-wrapper"
import TemplateTable from "./template-table"
import { TemplateType } from "../../types/shared"
import { Route, Routes } from "react-router-dom"
import Detail from "./detail"

enum Views {
  EMAIL = "email",
  SMS = "sms",
}

function Index() {
  const actionables = []

  const [view, setView] = useState(Views.EMAIL)
  const {
    state: updateTemplateState,
    close: closeUpdateTemplate,
    open: openUpdateTemplate,
  } = useToggleState()

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="flex w-full grow flex-col">
          <BodyCard
            customHeader={
              <TableViewHeader
                views={[Views.EMAIL.toString(), Views.SMS.toString()]}
                setActiveView={(value) => {
                  setView(value as Views)
                }}
                activeView={view.toString()}
              />
            }
            className="h-fit"
          >
            <TemplateTable type={view.toString() as TemplateType} />
          </BodyCard>
        </div>
      </div>
    </>
  )
}

function TemplateRoutes() {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="/:id" element={<Detail />} />
    </Routes>
  )
}

export default TemplateRoutes
