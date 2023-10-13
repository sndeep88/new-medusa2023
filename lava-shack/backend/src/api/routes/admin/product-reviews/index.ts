import { wrapHandler } from "@medusajs/medusa";
import * as bodyParser from "body-parser";
import { Router } from "express";
import getProductReviews from "./get-product-reviews";

const router = Router();

export default (adminRouter: Router) => {
	adminRouter.use("/product-reviews", router);

	router.get("/:productId", wrapHandler(getProductReviews));
	router.post("/:id/update", wrapHandler(require("./update-review").default));

	return adminRouter;
};
