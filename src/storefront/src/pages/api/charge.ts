import { NextApiHandler } from "next"

import createMyUser from "myuserpay"

const skApi = process.env.MYUSER_SECRET_KEY ?? ""

const chargeHandler: NextApiHandler = async (req, res) => {
  let myuser = createMyUser(skApi)

  // console.log("req.body", req.body)

  const result = await myuser.charge({
    MyUserToken: req.body.token,
    // token: req.body.token,
    amount: req.body.amount,
    // save: true,
  })

  var status = 200
  if (!result.status) {
    status = 400
  }

  res.status(status).json(result)
}

export default chargeHandler
