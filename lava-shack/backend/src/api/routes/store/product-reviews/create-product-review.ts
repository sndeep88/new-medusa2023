import { Request, Response } from "express";
import ReviewService from "services/review";

export default async function (req: Request, res: Response) {
	const productReviewService =
		req.scope.resolve<ReviewService>("reviewService");
	productReviewService
		.addProductReview(req.params.productId, req.body.data)
		.then((product_review) => {
			return res.json({
				product_review,
			});
		});
}
