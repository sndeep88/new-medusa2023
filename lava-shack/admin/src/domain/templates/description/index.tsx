import Table from "../../../components/molecules/table"
import metadata from "../desc.json"

function DescSection() {
  return (
    <div className="w-full mt-small">
      <div
        className={"inter-small-semibold flex w-full items-center text-grey-50"}
      >
        <label>Descriptions</label>
      </div>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Variable</Table.HeadCell>
            <Table.HeadCell>Desciption</Table.HeadCell>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {Object.keys(metadata).map((key, index) => (
            <Table.Row key={index}>
              <Table.Cell>{key}</Table.Cell>
              <Table.Cell>{metadata[key]}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
export default DescSection
