import { wrapHandler } from "@medusajs/medusa";
import { Router } from "express";
import handleEmail from "./handle-email";
import bodyParser = require("body-parser");

const route = Router();

export default (app: Router) => {
	app.use("/email", route);

	route.post("/send", bodyParser.json(), wrapHandler(handleEmail));

	return app;
};
