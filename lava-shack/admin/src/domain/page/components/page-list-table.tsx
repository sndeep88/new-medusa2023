import {
  Column,
  HeaderGroup,
  Row,
  TableOptions,
  UseSortByColumnProps,
  useTable,
} from "react-table"
import { Page, PageStatus } from "../../../types/shared"
import Table, { TableProps } from "../../../components/molecules/table"
import { useEffect, useState } from "react"
import { useDebounce } from "../../../hooks/use-debounce"
import TableContainer from "../../../components/organisms/table-container"
import TrashIcon from "../../../components/fundamentals/icons/trash-icon"
import UnpublishIcon from "../../../components/fundamentals/icons/unpublish-icon"
import { useAdminCustomDelete, useAdminCustomPost } from "medusa-react"
import useNotification from "../../../hooks/use-notification"
import { getErrorMessage } from "../../../utils/error-messages"
import PublishIcon from "../../../components/fundamentals/icons/publish-icon"

type HeaderCellProps = {
  col: HeaderGroup<Page> & UseSortByColumnProps<Page>
}

function PageListTableHeaderCell(props: HeaderCellProps) {
  return (
    <Table.HeadCell className="w-[100px]" {...props.col.getHeaderProps()}>
      {props.col.render("Header")}
    </Table.HeadCell>
  )
}

type HeaderRowProps = {
  headerGroup: HeaderGroup<Page>
}

function PageListTableHeaderRow(props: HeaderRowProps) {
  return (
    <Table.HeadRow {...props.headerGroup.getHeaderGroupProps()}>
      {props.headerGroup.headers.map((col) => (
        <PageListTableHeaderCell key={col.id} col={col} />
      ))}
    </Table.HeadRow>
  )
}

type PageListTableRowProps = {
  row: Row<Page>
}

function PageListTableRow(props: PageListTableRowProps) {
  const { row } = props
  const notification = useNotification()

  const updatePage = useAdminCustomPost(`/pages/${row.original.id}`, [
    "pages",
    row.original.id,
  ])
  const deletePage = useAdminCustomDelete(`/pages/${row.original.id}`, [
    "pages",
    row.original.id,
  ])

  const unPublish = () => {
    updatePage.mutate(
      {
        status:
          row.original.status === PageStatus.PUBLISH
            ? PageStatus.UNPUBLISH
            : PageStatus.PUBLISH,
      },
      {
        onSuccess: () => {
          notification("Success", "Unpublish page", "success")
        },
        onError: (error) => {
          notification("Error", getErrorMessage(error), "error")
        },
      }
    )
  }

  const onDelete = () => {
    deletePage.mutate(undefined, {
      onSuccess: () => {
        notification("Success", "Page deleted", "success")
      },
      onError: (error) => {
        notification("Error", getErrorMessage(error), "error")
      },
    })
  }

  return (
    <Table.Row
      color="inherit"
      linkTo={row.original.id}
      id={row.original.id}
      className="group"
      actions={[
        {
          label:
            row.original.status === PageStatus.PUBLISH
              ? "UnPublish"
              : "Publish",
          onClick: unPublish,
          icon:
            row.original.status === PageStatus.PUBLISH ? (
              <UnpublishIcon size={20} />
            ) : (
              <PublishIcon size={20} />
            ),
        },
        {
          label: "Delete",
          onClick: onDelete,
          icon: <TrashIcon size={20} />,
          variant: "danger",
        },
      ]}
      {...row.getRowProps()}
    >
      {row.cells.map((cell, index) => cell.render("Cell", { index }))}
    </Table.Row>
  )
}

type PageListTableProps = {
  isLoading?: boolean
  pages: Page[]
  columns: Array<Column<Page>>
  count: number
  options: Omit<TableProps, "filteringOptions"> & {
    filter: Pick<TableProps, "filteringOptions">
  }
}

export function PageListTable(props: PageListTableProps) {
  const [query, setQuery] = useState("")

  const { columns, count, pages, options, isLoading } = props

  const tableConfig: TableOptions<Page> = {
    columns,
    data: pages || [],
    initialState: {
      pageSize: 10,
      pageIndex: 0,
    },
    pageCount: Math.ceil(count / 10),
    manualPagination: true,
    autoResetPage: false,
  }

  const table = useTable(tableConfig)

  const handleNext = () => {}

  const handlePrev = () => {}

  const debouncedSearchTerm = useDebounce(query, 500)

  // useEffect(() => {
  //   table.gotoPage(0)
  // }, [debouncedSearchTerm])

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
      <Table
        {...table.getTableProps()}
        {...options}
        enableSearch={options.enableSearch}
        searchValue={query}
        handleSearch={options.enableSearch ? setQuery : undefined}
        filteringOptions={options.filter}
      >
        {/* HEAD */}
        <Table.Head>
          {table.headerGroups.map((headerGroup, idx) => (
            <PageListTableHeaderRow key={idx} headerGroup={headerGroup} />
          ))}
        </Table.Head>

        {/* BODY */}
        <Table.Body {...table.getTableBodyProps()}>
          {table.rows.map((row) => {
            table.prepareRow(row)
            return <PageListTableRow row={row} />
          })}
        </Table.Body>
      </Table>
    </TableContainer>
  )
}
