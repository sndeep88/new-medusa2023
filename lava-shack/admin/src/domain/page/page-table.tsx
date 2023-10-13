import { useAdminCustomQuery } from "medusa-react"
import { useLocation } from "react-router-dom"
import { Column } from "react-table"
import { PageListTable } from "./components/page-list-table"
import { Page } from "../../types/shared"
import Table from "../../components/molecules/table"
import { getPageStatus } from "./components/utils"
import moment from "moment"

const DEFAULT_PAGE_SIZE = 10
const defaultQueryProps = {
  offset: 0,
  limit: DEFAULT_PAGE_SIZE,
}

const COLUMNS: Column<Page>[] = [
  {
    Header: "Title",
    accessor: "title",
    Cell: ({ cell: { value } }) => (
      <Table.Cell>
        <span className="inter-small-regular">{value}</span>
      </Table.Cell>
    ),
  },
  {
    Header: "Slug",
    accessor: "slug",
    Cell: ({ cell: { value } }) => (
      <Table.Cell>
        <span className="inter-small-regular">/pages/{value}</span>
      </Table.Cell>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row: { original } }) => (
      <Table.Cell>{getPageStatus(original.status)}</Table.Cell>
    ),
  },
  {
    Header: "Last Update",
    accessor: "updatedAt",
    Cell: ({ cell: { value } }) => (
      <Table.Cell>{moment(value).format("DD MMM YYYY")}</Table.Cell>
    ),
  },
]

function PageTable() {
  const location = useLocation()

  const { data, isLoading } = useAdminCustomQuery("/pages", ["pages"])
  const pages = data?.pages ?? []

  const params = {}

  return (
    <div>
      <PageListTable
        isLoading={isLoading}
        columns={COLUMNS}
        count={pages.length}
        pages={pages}
        options={{
          enableSearch: true,
          filter: <></>,
        }}
        {...params}
      />
    </div>
  )
}
export default PageTable
