import { NextApiRequest, NextApiResponse } from "next"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? ""

export default async function mpayCallBack(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.query

  // console.log({ query: req.query })

  if (req.query.status !== "1") {
    const message = req.query["error[message]"]

    return res.status(400).redirect(`/order/failed?message=${message}`)
  }

  const result = await fetch(
    `${BACKEND_URL}/hooks/mpay/callback/${token}${
      req.url?.split(token as string)[1]
    }`
  )
    .then((res) => res.text())
    .then((text) => {
      // console.log(text)
      return JSON.parse(text)
    })
    .catch((err) => {
      console.error(err)
      return undefined
    })

  // console.log({ result })

  if (!result.status || !result) {
    return res.status(404).redirect("/404")
  }

  const order = result.order
  return res.status(200).redirect(`/order/confirmed/${order?.id}`)
}
