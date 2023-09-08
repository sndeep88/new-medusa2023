import { wrapHandler } from "@medusajs/medusa";
import { Router } from "express";
import getProductDescription from "./product-description-get-handler";
import updateProductDescription from "./product-description-post-handler";

import bodyParser = require("body-parser");

const router = Router();

export default (adminRouter: Router) => {
	adminRouter.use("/product/description", router);

	router.get("/:productId", wrapHandler(getProductDescription));
	router.post(
		"/:productId",
		bodyParser.json({ limit: "50mb" }),
		wrapHandler(updateProductDescription)
	);

	return adminRouter;
};
