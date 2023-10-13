import { AwilixContainer } from "awilix";
import ProductReviewRepository from "repositories/product-review";
import ReviewScoreService from "services/review-score";

export default async (
	container: AwilixContainer,
	config: Record<string, unknown>
) => {
	const reviewRepo = container.resolve<typeof ProductReviewRepository>(
		"productReviewRepository"
	);
	const scoreService =
		container.resolve<ReviewScoreService>("reviewScoreService");

	const distinctReviews = await reviewRepo
		.createQueryBuilder("reviews")
		.distinctOn(["product_id"])
		.getMany();

	for (let review of distinctReviews) {
		// console.log(`create score for review: ${review.product_id}`);
		await scoreService.updateScoreByReview(review.product_id);
	}
};
