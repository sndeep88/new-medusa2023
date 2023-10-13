import { Dialog, Transition } from "@headlessui/react"
import noop from "@lib/util/noop"
import Spinner from "@modules/common/icons/spinner"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Loading = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setIsLoading(true)
    })

    router.events.on("routeChangeComplete", () => {
      setIsLoading(false)
    })

    return () => {
      setIsLoading(false)
    }
  }, [router])

  return isLoading ? (
    <Transition show={isLoading}>
      <Dialog onClose={noop} className="relative z-[100]">
        <Transition.Child
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
            <Spinner size={24} />
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  ) : null
}

export default Loading
