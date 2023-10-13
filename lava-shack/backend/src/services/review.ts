import { EventBusService, TransactionBaseService } from "@medusajs/medusa";
import ProductReviewRepository from "repositories/product-review";
import ReviewImageRepository from "repositories/review-image";

class ReviewService extends TransactionBaseService {
	// protected manager_: EntityManager;
	private productReviewRepository_: typeof ProductReviewRepository;
	private reviewImageRepository_: typeof ReviewImageRepository;
	private eventBus_: EventBusService;

	constructor(container) {
		super(container);

		this.productReviewRepository_ = container.productReviewRepository;
		this.reviewImageRepository_ = container.reviewImageRepository;
		this.eventBus_ = container.eventBusService;
	}

	async getProductReviews(product_id: string) {
		return this.productReviewRepository_.find({
			where: {
				product_id: product_id,
				enabled: true,
			},
			relations: ["images"],
			order: { created_at: "DESC" },
		});
	}

	async getAllByProduct(productId: string) {
		return this.productReviewRepository_.find({
			where: { product_id: productId },
			relations: ["images"],
			order: { created_at: "DESC" },
		});
	}

	async addProductReview(
		product_id: string,
		{ images, ...data }: { images: any[] } & any
	) {
		console.log({ data });
		if (!data.title || !data.full_name || !data.content || !data.rating) {
			throw new Error(
				"product review requires title, full_name, content, and rating"
			);
		}

		const productReviewRepository = this.manager_.withRepository(
			this.productReviewRepository_
		);
		const createdReview = productReviewRepository.create({
			product_id: product_id,
			title: data.title,
			full_name: data.full_name,
			content: data.content,
			rating: data.rating,
			enabled: true,
		});
		const productReview = await productReviewRepository.save(createdReview);

		if (images && images.length > 0) {
			let savableImages = (images as any[]).slice(0, 50);
			const createdImages = savableImages.map((image) =>
				this.reviewImageRepository_.create({
					url: image.url,
					review: productReview,
				})
			);
			await this.reviewImageRepository_.save(createdImages);
			productReview.images = createdImages;
		}

		await this.eventBus_.emit("products.review", { productId: product_id });

		return productReview;
	}

	async retrieve(id: string) {
		return this.productReviewRepository_.findOne({ where: { id } });
	}

	async update(id: string, { images, ...update }: any) {
		const review = await this.retrieve(id);
		if (!review) {
			throw new Error("review not found");
		}

		const updatedReview = await this.productReviewRepository_.save({
			...review,
			...update,
		});

		if (images && images.length > 0) {
			await this.reviewImageRepository_.delete({ review_id: id });
			const savableImages = (images as any[]).slice(0, 50);
			const createdImages = savableImages.map((image) =>
				this.reviewImageRepository_.create({
					url: image,
					review: updatedReview,
				})
			);
			await this.reviewImageRepository_.save(createdImages);
			updatedReview.images = createdImages;
		}

		if (images.length === 0) {
			await this.reviewImageRepository_.delete({ review_id: id });
		}

		await this.eventBus_.emit("products.review", {
			productId: updatedReview.product_id,
		});

		return updatedReview;
	}
}

export default ReviewService;
