import { wrapHandler } from "@medusajs/medusa";

import { Router } from "express";
import bodyParser = require("body-parser");
import paymenthandler from "./paymenthandler";
import mpay from "./mpay";

const route = Router();

export default (app: Router) => {
	app.use("/hooks", route);

	// route.post(
	// 	"/mpay",
	// 	bodyParser.json(),
	// 	wrapHandler(require("./mpay").default)
	// );
	mpay(route);

	return app;
};
