import { NextApiRequest, NextApiResponse } from "next"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? ""

export default async function paynow(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body

  let ip = req.headers["x-real-ip"] as string

  const forwardedFor = req.headers["x-forwarded-for"] as string
  if (!ip && forwardedFor) {
    ip = forwardedFor?.split(",").at(0) ?? "Unknown"
  }
  const user_agent = req.headers["user-agent"] as string

  // console.log({ ip, forwardedFor })

  await fetch(`${BACKEND_URL}/hooks/mpay/pay`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      card: body.card,
      amount: body.amount,
      order_id: body.order_id,
      token: body.token,
      // user metadata
      agent: user_agent,
      user_ip: ip,
      forwarded_for: forwardedFor,
    }),
  })

  return res.status(200).end()
}
