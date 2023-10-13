import { EventBusService, TransactionBaseService } from "@medusajs/medusa";
import TemplateRepository from "../repositories/template";
import Template, { TemplateType } from "../models/template";
import * as fs from "fs";
import { join } from "path";
import * as _ from "lodash";
import { ConfigType } from "models/system-config";

const defaultSubject = {
	"confirm-order": "[Shopping Center] Order confirmed",
	"remind-order": "[Shopping Center] Complete your purchase",
	invitation: "[Shopping Center] Invitation",
	"sign-up": "[Shopping Center] You register an account",
};

export class TemplateService extends TransactionBaseService {
	protected repository_: typeof TemplateRepository;
	private eventBus_: EventBusService;

	constructor(container, options) {
		super(container, options);

		this.repository_ = TemplateRepository;
		this.eventBus_ = container.eventBusService;
	}

	async getAll() {
		return await this.repository_.find();
	}

	async getByType(type: TemplateType) {
		return await this.repository_.find({
			where: { type },
			order: { updated_at: "DESC" },
		});
	}

	async getById(id: string) {
		return await this.repository_.findOne({ where: { id } });
	}

	async getByCode(code: string, type?: string | ConfigType) {
		var where = {};

		where = { ...where, code };

		if (type) {
			where = { ...where, type: type as ConfigType };
		}

		return await this.repository_.findOne({ where });
	}

	async update(
		id: string,
		updateData: {
			template: string;
			subject: string;
			description: string;
			enable: boolean;
		}
	) {
		const template = await this.repository_.findOne({ where: { id } });

		if (!template) throw new Error(`Template with id: ${id} not found`);

		if (!_.isEqual(template.template, updateData.template)) {
			template.template = updateData.template;
		}

		if (!_.isEqual(template.subject, updateData.subject)) {
			template.subject = updateData.subject;
		}

		if (!_.isEqual(template.enable, updateData.enable)) {
			template.enable = updateData.enable;
		}

		await this.repository_.save(template);
		this.eventBus_.emit(`template.updated.${template.type}`, template);

		return template;
	}

	async restoreDefault(id: string) {
		const template = await this.repository_.findOne({ where: { id } });

		if (!template) throw new Error(`Template with id: ${id} not found`);

		switch (template.type) {
			case TemplateType.EMAIL:
				return await this.createDefaultEmailTemplate(template);
			case TemplateType.SMS:
				return await this.createDefaultSmsTemplate(template);
			default:
				break;
		}

		return template;
	}

	async createDefaultEmailTemplate(template: Template) {
		const defaultTem = fs.readFileSync(
			join(process.cwd(), "template_default", "default.html"),
			"utf-8"
		);

		var subject = defaultSubject[template.code];

		_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
		const baseHtmlCompile = _.template(defaultTem.toString());
		const filecontent = baseHtmlCompile({
			subject,
			textDiscount: "{{ textDiscount }}",
			discountCode: "{{ discountCode }}",
			storeUrl: "{{ storeUrl }}",
			url: "{{ url }}",
		});

		template.default_template = filecontent;
		template.template = filecontent;
		template.subject = subject;

		await this.repository_.save(template);
		this.eventBus_.emit(`template.updated.${template.type}`, template);

		return template;
	}

	async createDefaultSmsTemplate(template: Template) {
		const defaultTem = fs.readFileSync(
			join(process.cwd(), "template_default", "default.txt"),
			"utf-8"
		);
		template.default_template = defaultTem;
		template.template = defaultTem;

		await this.repository_.save(template);
		this.eventBus_.emit(`template.updated.${template.type}`, template);
	}

	async createCode(template: Template) {
		const code = _.kebabCase(template.title);
		template.code = code;

		await this.repository_.save(template);
	}
}

export default TemplateService;
