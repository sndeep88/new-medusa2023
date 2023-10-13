import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	const productReviewService = req.scope.resolve("reviewService");

	return productReviewService
		.getProductReviews(req.params.productId)
		.then((product_reviews) => {
			return res.json({
				product_reviews,
			});
		});
};
