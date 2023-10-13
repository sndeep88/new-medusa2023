import { Logger } from "@medusajs/medusa";
import ReviewScoreService from "../services/review-score";

class ReviewSubcriber {
	reviewScoreService_: ReviewScoreService;
	logger_: Logger;

	constructor({ eventBusService, reviewScoreService, logger }) {
		this.reviewScoreService_ = reviewScoreService;
		this.logger_ = logger;

		eventBusService.subscribe("products.review", this.handleNewReview);
	}

	handleNewReview = async ({ productId }) => {
		this.logger_.info(`Update review score of product id: ${productId}`);
		await this.reviewScoreService_.updateScoreByReview(productId);
	};
}

export default ReviewSubcriber;
