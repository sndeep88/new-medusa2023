import { NextApiRequest, NextApiResponse } from "next"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? ""

export default async function verfiyCard(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body
  let ip = req.headers["x-real-ip"] as string

  const forwardedFor = req.headers["x-forwarded-for"] as string
  if (!ip && forwardedFor) {
    ip = forwardedFor?.split(",").at(0) ?? "Unknown"
  }
  if (process.env.NODE_ENV === "development") {
    ip = "113.161.40.60"
  }

  const user_agent = req.headers["user-agent"] as string

  // console.log(body)

  const requestBody = {
    card: body.card,
    agent: user_agent,
    user_ip: ip,
    forwarded_for: forwardedFor,
    amount: body.amount,
    cart_id: body.cart_id,
  }

  // console.log({ requestBody })
  const result = await fetch(`${BACKEND_URL}/hooks/mpay/verify`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err)
      return undefined
    })

  if (!result) {
    return res
      .status(500)
      .redirect(
        "/order/failed?message=Something went wrong, please try again later"
      )
  }

  // console.log({ result })

  // if (!result.status && result.error.action.name === "require_auth") {
  //   return NextResponse.redirect(result.error.action.redirect_url)
  // }

  return res.status(200).json(result)
}
