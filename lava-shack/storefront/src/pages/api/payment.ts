import { NextApiHandler } from "next"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? ""

const paymentHandler: NextApiHandler = async (req, res) => {
  await fetch(`${BACKEND_URL}/hooks/square`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(req.body),
  })

  return res.status(200).json({ status: "ok" })
}

export default paymentHandler
