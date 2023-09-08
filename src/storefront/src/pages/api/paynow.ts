import { NextApiRequest, NextApiResponse } from "next"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? ""

export default async function paynow(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body
  console.log(req.headers.forwarded)

  let result = await fetch(`${BACKEND_URL}/mpay/pay`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      cartId: body.cartId,
      card: body.card,
      amount: body.amount,
      agent: req.headers["user-agent"],
    }),
  })
    .then((res) => res.json())
    .catch((_) => undefined)

  console.log({ result })

  return res.status(200).json(result)
}
