import { ProductService, TransactionBaseService } from "@medusajs/medusa";
import { ProductDescriptionRepository } from "../repositories/product-description";

class ProductDescriptionService extends TransactionBaseService {
	protected descriptionRepository_: typeof ProductDescriptionRepository;
	private productService_: ProductService;

	constructor(container) {
		super(container);

		this.descriptionRepository_ = container.productDescriptionRepository;

		this.productService_ = container.productService;
	}

	async getProductDescription(productId: string) {
		const product = await this.productService_.retrieve(productId);
		if (!product) {
			throw new Error("Product not found");
		}

		const prodDesc = await this.getOrCreateDescription(product);
		return prodDesc;
	}

	async findByProductHandle(handle: string) {
		const product = await this.productService_.retrieveByHandle(handle);
		if (!product) {
			throw new Error("Product not found");
		}

		const pd = await this.descriptionRepository_.findOne({
			where: { product_id: product?.id },
		});

		return pd;
	}

	async updateProductDescription(productId: string, description: string) {
		const product = await this.productService_.retrieve(productId);
		if (!product) {
			throw new Error("Product not found");
		}

		var prodDesc = await this.getOrCreateDescription(product);

		prodDesc.content = description;

		await this.descriptionRepository_.save(prodDesc);

		return prodDesc;
	}

	private async getOrCreateDescription(product) {
		const desc = await this.descriptionRepository_.findOne({
			where: { product_id: product.id },
		});

		if (desc) {
			return desc;
		}

		const newDesc = this.descriptionRepository_.create({
			product_id: product.id,
			content: "{}",
		});

		return newDesc;
	}
}

export default ProductDescriptionService;
