import { Column, Row, useTable } from "react-table"
import TableContainer from "../../../../components/organisms/table-container"
import { Pixel } from "../../../../types/shared"
import Switch from "../../../../components/atoms/switch"
import {
  useAdminCustomDelete,
  useAdminCustomPost,
  useAdminCustomQuery,
} from "medusa-react"
import { useState } from "react"
import Table from "../../../../components/molecules/table"
import { ActionType } from "../../../../components/molecules/actionables"
import TrashIcon from "../../../../components/fundamentals/icons/trash-icon"
import DeletePrompt from "../../../../components/organisms/delete-prompt"

import useNotification from "../../../../hooks/use-notification"

const PAGE_SIZE = 100

const COLUMNS: Column<Pixel>[] = [
  {
    accessor: "pixel_id",
    Header: (
      <div className="text-small font-semibold text-gray-500">PixelID</div>
    ),
    Cell: ({ row: { original } }) => {
      return <span className="text-gray-900">{original.pixel_id}</span>
    },
  },
  {
    accessor: "type",
    Header: <div className="text-small font-semibold text-gray-500">Type</div>,
    Cell: ({ row: { original } }) => {
      return <span className="text-gray-900">{original.type}</span>
    },
  },
  {
    accessor: "enabled",
    Header: (
      <div className="text-small font-semibold text-gray-500">Enabled</div>
    ),
    Cell: ({ row: { original } }) => {
      const notification = useNotification()
      const { mutateAsync } = useAdminCustomPost(
        `/admin/pixels/${original.id}`,
        ["pixels", original.id]
      )

      const updatePixel = async () => {
        try {
          await mutateAsync({ enabled: !original.enabled })
          notification("Success", "Pixel updated", "success")
        } catch (e) {
          notification("Error", (e as any).message, "error")
        } finally {
        }
      }

      return <Switch checked={original.enabled} onCheckedChange={updatePixel} />
    },
  },
]

type PixelRowProps = {
  row: Row<Pixel>
}

function PixelRow(props: PixelRowProps) {
  const { row } = props
  const rowId = row.original.id

  const [showDelete, setShowDelete] = useState(false)

  const { mutateAsync: deletePixel } = useAdminCustomDelete(
    `/admin/pixels/${rowId}`,
    ["pixels", rowId]
  )

  const actions: ActionType[] = [
    {
      label: "Delete",
      onClick: () => setShowDelete(true),
      icon: <TrashIcon size={16} />,
      variant: "danger",
    },
  ]

  return (
    <>
      <Table.Row {...props.row.getRowProps()} actions={actions}>
        {row.cells.map((cell) => (
          <Table.Cell {...cell.getCellProps()}>
            {cell.render("Cell")}
          </Table.Cell>
        ))}
      </Table.Row>

      {showDelete && (
        <DeletePrompt
          handleClose={() => setShowDelete(false)}
          onDelete={() => deletePixel()}
          confirmText="Yes, delete"
          successText="Pixel deleted"
          text={`Are you sure you want to delete this facebook pixel?`}
          heading="Delete pixel"
        />
      )}
    </>
  )
}

function PixelTable() {
  const [numPages, setNumPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  const { data, isLoading } = useAdminCustomQuery("/admin/pixels", ["pixels"])

  const table = useTable({
    columns: COLUMNS,
    data: data?.pixels || [],
    manualPagination: true,
    initialState: {
      pageIndex: currentPage,
      pageSize: PAGE_SIZE,
      selectedRowIds: {},
    },
    pageCount: numPages,
    autoResetSelectedRows: false,
    autoResetPage: false,
    getRowId: (row) => row.id,
  })
  return (
    <TableContainer
      isLoading={isLoading}
      numberOfRows={PAGE_SIZE}
      pagingState={{
        count: data?.pixels?.length || 0,
        offset: 0,
        title: "Pixels",
        pageCount: 1,
        currentPage: 1,
        hasNext: false,
        hasPrev: false,
        pageSize: PAGE_SIZE,
        nextPage: () => {},
        prevPage: () => {},
      }}
    >
      <Table {...table.getTableProps()}>
        {/* ===HEADER==== */}
        {table.headerGroups.map((headerGroup) => (
          <Table.HeadRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((col) => (
              <Table.HeadCell {...col.getHeaderProps()}>
                {col.render("Header")}
              </Table.HeadCell>
            ))}
          </Table.HeadRow>
        ))}

        {/* ====BODY==== */}
        <Table.Body {...table.getTableBodyProps()}>
          {table.rows.map((row) => {
            table.prepareRow(row)
            return <PixelRow key={row.id} row={row} />
          })}
        </Table.Body>
      </Table>
    </TableContainer>
  )
}
export default PixelTable
