import { wrapHandler } from "@medusajs/medusa";

import { Router } from "express";
import myuserHooks from "./myuser";
import bodyParser = require("body-parser");

const route = Router();

export default (app: Router) => {
	app.use("/mpay", route);

	route.post(
		"/hooks",
		bodyParser.raw({ type: "application/json" }),
		wrapHandler(myuserHooks)
	);

	return app;
};
