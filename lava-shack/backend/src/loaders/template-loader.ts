import { AwilixContainer } from "awilix";
import TemplateService from "../services/template";
import { TemplateType } from "../models/template";
import { EventBusService, Logger } from "@medusajs/medusa";
import * as fs from "fs";
import { join } from "path";

export default async (
	container: AwilixContainer,
	config: Record<string, unknown>
) => {
	const logger = container.resolve<Logger>("logger");
	const eventBus = container.resolve<EventBusService>("eventBusService");

	logger.info("Starting template loader...");

	const templateService = container.resolve<TemplateService>("templateService");

	const templates = await templateService.getAll();
	console.info(`template count: ${templates.length}`);

	for (const template of templates) {
		var createfile = true;
		switch (template.type) {
			case TemplateType.EMAIL:
				if (!template.default_template || template.default_template === "") {
					logger.info(
						`creating default template for ${template.type} - ${template.title}`
					);
					await templateService.createDefaultEmailTemplate(template);
					createfile = false;
				}
				break;
			case TemplateType.SMS:
				if (!template.default_template || template.default_template === "") {
					logger.info(
						`creating default template for ${template.type} - ${template.title}`
					);
					await templateService.createDefaultSmsTemplate(template);
					createfile = false;
				}
				break;
			default:
				break;
		}

		if (!template.code || template.code === "") {
			logger.info(`creating code for ${template.type} - ${template.title}`);
			await templateService.createCode(template);
		}

		var filename = `${template.code}.${
			template.type === "email" ? "html" : "txt"
		}`;

		if (
			createfile &&
			!fs.existsSync(join(process.cwd(), "template", filename))
		) {
			logger.info(`creating file for ${template.type} - ${template.title}`);
			await eventBus.emit(`template.updated.${template.type}`, template);
		}
	}

	logger.info("ending loader...");
};
