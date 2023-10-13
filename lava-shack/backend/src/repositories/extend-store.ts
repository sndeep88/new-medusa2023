import { ExtendStore } from "../models/extend-store";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

export const ExtendStoreRepository = dataSource.getRepository(ExtendStore);

export default ExtendStoreRepository;
