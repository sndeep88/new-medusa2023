import { Request, Response } from "express";
import ReviewScoreService from "services/review-score";

export default async (req: Request, res: Response) => {
	const productId = req.params.productId;

	const reviewScoreService =
		req.scope.resolve<ReviewScoreService>("reviewScoreService");

	const score = await reviewScoreService.getOrCreate(productId);

	res.json({ score });
};
