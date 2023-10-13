import { wrapHandler } from "@medusajs/medusa";
import * as bodyParser from "body-parser";
import { Router } from "express";
import getProductReviews from "./get-product-reviews";
import createProductReview from "./create-product-review";
import getProductReviewScore from "./get-product-review-score";
import getProductsScores from "./get-products-scores";

const router = Router();

export default (storeRouter: Router) => {
	storeRouter.use("/product-reviews", router);

	router.use(bodyParser.json());
	router.use(bodyParser.urlencoded({ extended: true }));

	router.get("/:productId", wrapHandler(getProductReviews));
	router.post("/:productId", wrapHandler(createProductReview));
	router.get("/:productId/score", wrapHandler(getProductReviewScore));

	router.get("/", wrapHandler(getProductsScores));
};
