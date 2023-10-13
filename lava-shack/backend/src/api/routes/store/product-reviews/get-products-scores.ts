import { Request, Response } from "express";
import ReviewScoreService from "services/review-score";

export default async (req: Request, res: Response) => {
	const productIds = req.query.productIds as string;

	console.log({ productIds });

	const reviewScoreService =
		req.scope.resolve<ReviewScoreService>("reviewScoreService");

	const scores = await reviewScoreService.getByProductIds(
		productIds.split(",")
	);

	res.json({ scores });
};
