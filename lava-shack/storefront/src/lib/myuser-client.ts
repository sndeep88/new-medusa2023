import createMyUser from "myuserpay"

const privateKey = process.env.MYUSER_PRIVATE_KEY ?? ""

const client = createMyUser(privateKey)

export default client
