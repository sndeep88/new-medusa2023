import { TransactionBaseService } from "@medusajs/medusa";
import ReviewScoreRepository from "../repositories/review-score";
import ReviewService from "./review";
import * as _ from "lodash";
import { In } from "typeorm";

export class ReviewScoreService extends TransactionBaseService {
	private repository_: typeof ReviewScoreRepository;
	private reviewService_: ReviewService;

	constructor(container, options) {
		super(container, options);

		this.repository_ = container.reviewScoreRepository;
		this.reviewService_ = container.reviewService;
	}

	async getByProductIds(productIds: string[]) {
		return this.repository_.find({ where: { product_id: In(productIds) } });
	}

	

	async getOrCreate(productId: string) {
		const score = await this.repository_.findOne({
			where: { product_id: productId },
		});

		if (score) {
			return score;
		}

		const newScore = this.repository_.create({
			product_id: productId,
			score: 0,
		});
		await this.repository_.save(newScore);

		return newScore;
	}

	async updateScore(productId: string, score: number) {
		const scoreEntity = await this.getOrCreate(productId);

		scoreEntity.score = score;
		await this.repository_.save(scoreEntity);

		return scoreEntity;
	}

	async updateScoreByReview(productId: string) {
		const reviews = await this.reviewService_.getProductReviews(productId);

		const score = _.meanBy(reviews, "rating");

		const scoreEntity = await this.getOrCreate(productId);

		scoreEntity.score = score;
		scoreEntity.amount = reviews.length;

		await this.repository_.save(scoreEntity);

		return scoreEntity;
	}
}

export default ReviewScoreService;
