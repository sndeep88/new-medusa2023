import { Request, Response } from "express";
import ReviewService from "services/review";

export default async (req: Request, res: Response) => {
	const reviewService = req.scope.resolve<ReviewService>("reviewService");

	const { id } = req.params;
	const product_review = await reviewService.update(id, req.body);

	res.json({ product_review });
};
