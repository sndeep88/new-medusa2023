import { Request, Response } from "express";
import ReviewService from "services/review";

export default async (req: Request, res: Response) => {
	const productReviewService =
		req.scope.resolve<ReviewService>("reviewService");

	productReviewService
		.getAllByProduct(req.params.productId)
		.then((product_reviews) => {
			return res.json({
				product_reviews,
			});
		});
};
