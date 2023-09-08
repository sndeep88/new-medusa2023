import { wrapHandler } from "@medusajs/medusa";

import { Router } from "express";
import myuserHooks from "./myuser";
import bodyParser = require("body-parser");
import paymenthandler from "./paymenthandler";


const route = Router();

export default (app: Router) => {
	app.use("/mpay", route);

	route.post(
		"/hooks",
		bodyParser.raw({ type: "application/json" }),
		wrapHandler(myuserHooks)
	);

	route.post(
		"/pay",
		bodyParser.raw({ type: "application/json" }),
		wrapHandler(paymenthandler)
	);

	return app;
};
