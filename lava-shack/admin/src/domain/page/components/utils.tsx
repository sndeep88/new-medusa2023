import { PageStatus } from "../../../types/shared"
import StatusDot from "../../../components/fundamentals/status-indicator"

export const getPageStatus = (status: PageStatus) => {
  switch (status) {
    case PageStatus.PUBLISH:
      return <StatusDot variant={"primary"} title="Published" />
    case PageStatus.UNPUBLISH:
      return <StatusDot variant={"danger"} title="UnPublished" />
    default:
      return null
  }
}
