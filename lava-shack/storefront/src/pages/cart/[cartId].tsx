import { useStore } from "@lib/context/store-context"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function CartPage() {
  const { query, replace } = useRouter()

  const { setCart } = useStore()

  useEffect(() => {
    if (query.cartId) {
      setCart(query.cartId as string)
      replace("/checkout")
    }
  }, [query])

  return null
}
