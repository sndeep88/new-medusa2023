import { NextApiHandler } from "next"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? ""

const sendEmail: NextApiHandler = async (req, res) => {
  const body = req.body
  console.log(req.headers.host)

  let result = await fetch(`${BACKEND_URL}/email/send`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...body, host: req.headers.host }),
  })
    .then((res) => res.json())
    .catch((_) => undefined)

  console.log({ result })

  res.json(result)
}

export default sendEmail
