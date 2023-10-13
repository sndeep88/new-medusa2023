import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { ReviewImage } from "../models/review-image";

export const ReviewImageRepository = dataSource.getRepository(ReviewImage);

export default ReviewImageRepository;
