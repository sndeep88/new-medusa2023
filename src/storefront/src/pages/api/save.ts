import createMyUser from "myuserpay"
import { NextApiRequest, NextApiResponse } from "next"

const skApi = process.env.MYUSER_SECRET_KEY ?? ""
const myuser = createMyUser(skApi)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var result = await myuser.charge({
    token: req.body?.token,
    amount: 100,
    save: true,
  })

  res.json(result)
}
