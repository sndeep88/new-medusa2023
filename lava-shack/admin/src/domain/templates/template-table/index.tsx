import { useAdminCustomPost, useAdminCustomQuery } from "medusa-react"
import { Column, TableOptions, useTable } from "react-table"
import Table from "../../../components/molecules/table"
import TableContainer from "../../../components/organisms/table-container"
import type { Template, TemplateType } from "../../../types/shared"
import moment from "moment"
import StatusIndicator from "../../../components/fundamentals/status-indicator"
import UnpublishIcon from "../../../components/fundamentals/icons/unpublish-icon"
import PublishIcon from "../../../components/fundamentals/icons/publish-icon"

const COLUMNS: Column<Template>[] = [
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Last Update",
    accessor: "updated_at",
    Cell: ({ cell: { value } }) => moment(value).format("DD MMM YYYY HH:mm"),
  },
  {
    Header: "Status",
    accessor: "enable",
    Cell: ({ cell: { value } }) => {
      const status = value ? "Enabled" : "Disabled"

      return (
        <StatusIndicator
          title={status}
          variant={value ? "success" : "danger"}
        />
      )
    },
  },
]

function TemplateTable({ type }: { type: TemplateType }) {
  const { data: emailTemplates, isLoading } = useAdminCustomQuery(
    `/templates?type=${type}`,
    ["templates", type]
  )

  const count = emailTemplates?.count || 0

  const tableConfig: TableOptions<Template> = {
    columns: COLUMNS,
    data: emailTemplates?.templates || [],
    initialState: {
      pageSize: 10,
      pageIndex: 0,
    },
    pageCount: Math.ceil(count / 10),
    manualPagination: true,
    autoResetPage: false,
  }

  const table = useTable(tableConfig)

  const { headerGroups, rows, prepareRow } = table

  const handleNext = () => {}
  const handlePrev = () => {}

  return (
    <TableContainer
      isLoading={isLoading}
      numberOfRows={10}
      hasPagination
      pagingState={{
        count: count!,
        offset: 0,
        pageSize: 10,
        title: "Pages",
        currentPage: table.state.pageIndex + 1,
        pageCount: table.pageCount,
        nextPage: handleNext,
        prevPage: handlePrev,
        hasNext: table.canNextPage,
        hasPrev: table.canPreviousPage,
      }}
    >
      <Table {...table.getTableProps()} filteringOptions={<></>}>
        <Table.Head>
          {headerGroups?.map((headerGroup) => (
            <Table.HeadRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col) => (
                <Table.HeadCell
                  className="min-w-[100px]"
                  {...col.getHeaderProps()}
                >
                  {col.render("Header")}
                </Table.HeadCell>
              ))}
            </Table.HeadRow>
          ))}
        </Table.Head>

        <Table.Body {...table.getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return <TemplateRow row={row} {...row.getRowProps()} />
          })}
        </Table.Body>
      </Table>
    </TableContainer>
  )
}

function TemplateRow({ row, ...rest }) {
  const updateTemplate = useAdminCustomPost(`/templates/${row.original.id}`, [
    "templates",
    row.original.id,
  ])

  const onEnable = () => {
    updateTemplate.mutate({ enable: !row.original.enable })
  }

  return (
    <Table.Row
      color="inherit"
      linkTo={`/a/templates/${row.original.id}`}
      actions={[
        {
          label: row.original.enable ? "Disable" : "Enable",
          onClick: onEnable,
          icon: row.original.enable ? <UnpublishIcon /> : <PublishIcon />,
          variant: row.original.enable ? "danger" : "normal",
        },
      ]}
      forceDropdown
      {...rest}
    >
      {row.cells.map((cell, index) => {
        return (
          <Table.Cell {...cell.getCellProps()}>
            {cell.render("Cell", { index })}
          </Table.Cell>
        )
      })}
    </Table.Row>
  )
}

export default TemplateTable
