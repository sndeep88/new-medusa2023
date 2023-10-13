import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import ReviewScore from "../models/review-score";

export const ReviewScoreRepository = dataSource.getRepository(ReviewScore);

export default ReviewScoreRepository;
