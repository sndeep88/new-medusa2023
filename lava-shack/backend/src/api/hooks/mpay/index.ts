import { wrapHandler } from "@medusajs/medusa";
import bodyParser = require("body-parser");
import { Router } from "express";

const router = Router();

export default (app: Router) => {
	app.use("/mpay", bodyParser.json(), router);

	router.post(
		"/verify",
		bodyParser.json(),
		wrapHandler(require("./verify").default)
	);
	router.post("/pay", bodyParser.json(), wrapHandler(require("./pay").default));
	router.get("/callback/:token", wrapHandler(require("./callback").default));

	return app;
};
