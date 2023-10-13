import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { FbPixel } from "../models/fb-pixel";

export const FbPixelRepository = dataSource.getRepository(FbPixel);

export default FbPixelRepository;
