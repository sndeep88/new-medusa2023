import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import Template from "../models/template";

export const TemplateRepository = dataSource.getRepository(Template);

export default TemplateRepository;
