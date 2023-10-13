import { ProductReview } from "../models/review";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";
export const ProductReviewRepository = dataSource.getRepository(ProductReview);

export default ProductReviewRepository;
