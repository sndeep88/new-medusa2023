import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { SystemConfig } from "../models/system-config";

export const SystemConfigRepository = dataSource.getRepository(SystemConfig);

export default SystemConfigRepository;
