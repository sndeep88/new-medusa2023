import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { PageTag } from "../models/page-tag";

export const PageTagRepository = dataSource.getRepository(PageTag);

export default PageTagRepository;
