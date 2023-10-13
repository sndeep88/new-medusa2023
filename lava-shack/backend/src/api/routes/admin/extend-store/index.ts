import { wrapHandler } from "@medusajs/medusa";
import { Router } from "express";

import bodyParser = require("body-parser");
import extendStoreGetHandler from "./extend-store-get-handler";
import extendStorePostHandler from "./extend-store-post-handler";

const router = Router();

export default (adminRouter: Router) => {
	adminRouter.use("/extend-store", router);

	router.get("/", wrapHandler(extendStoreGetHandler));
	router.post("/", wrapHandler(extendStorePostHandler));

	return adminRouter;
};
