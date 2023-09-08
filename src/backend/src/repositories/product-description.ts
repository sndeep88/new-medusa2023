import { ProductDescription } from "../models/product-description";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

export const ProductDescriptionRepository =
	dataSource.getRepository(ProductDescription);

export default ProductDescriptionRepository;
