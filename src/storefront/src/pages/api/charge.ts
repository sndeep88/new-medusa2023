import { NextApiHandler } from "next"

import createMyUser from "myuserpay"
import { medusaClient } from "@lib/config"

const skApi = process.env.MYUSER_SECRET_KEY ?? ""
const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? ""

const chargeHandler: NextApiHandler = async (req, res) => {
  let myuser = createMyUser(skApi)

  // console.log("req.body", req.body)

  var body = {
    amount: req.body.amount,
  } as any

  if (req.body.token.startsWith("tok_")) {
    body = { ...body, token: req.body.token, save: true }
  } else {
    body = { ...body, MyUserToken: req.body.token }
  }

  console.log({ body })

  const result = await myuser.charge({
    // MyUserToken: req.body.token,
    // // token: req.body.token,
    // amount: req.body.amount,
    // // save: true,
    ...body,
  })

  var status = 200
  if (!result.status) {
    status = 400
  }

  console.log({ result })

  if (result.paid) {
    let order = await fetch(`${BACKEND_URL}/mpay/hooks`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ cartId: req.body.cartId, chargeId: result.id }),
    })
      .then((res) => res.json())
      .catch((_) => undefined)

    console.log({ order })

    if (!order) {
      res.status(400).json({ message: "Could not create order" })
      return
    }

    res.status(200).json(order)
    return
  }

  res.status(status).json(result)
}

export default chargeHandler
