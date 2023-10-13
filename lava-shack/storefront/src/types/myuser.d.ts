import { MyUserClient } from "myuserpay/lib/client"
import { MyUserClientBase } from "myuserpay/lib/client_base"

export {}

declare global {
  interface Window {
    MyUserPay: any
    Square: any
  }
}
