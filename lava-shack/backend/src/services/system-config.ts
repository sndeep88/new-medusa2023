import { EventBusService, TransactionBaseService } from "@medusajs/medusa";
import SystemConfigRepository from "../repositories/system-config";
import { ConfigType, ProviderType } from "../models/system-config";
import * as _ from "lodash";
import { Any, ILike, In } from "typeorm";

export class SystemConfigService extends TransactionBaseService {
	protected repository_: typeof SystemConfigRepository;
	private eventBusService_: EventBusService;

	constructor(container, options) {
		super(container, options);

		this.repository_ = SystemConfigRepository;
		this.eventBusService_ = container.eventBusService;
	}

	async list(select: string[] = []) {
		return this.repository_.find();
	}

	async findByKey(key: string) {
		return this.repository_.findOne({ where: { key } });
	}

	async create(data: any) {
		const cgf = this.repository_.create({
			type: data.type,
			provider: data.provider,
			key: data.key,
			key_name: data.key_name,
			key_description: data.key_description,
			required: data.required,
			value: data.value,
			dataType: data.dataType,
		});

		return this.repository_.save(cgf);
	}

	async update({ key, value, ...data }: any) {
		const cfg = await this.findByKey(key);

		if (!cfg) {
			throw new Error(`System config with key ${key} not found`);
		}

		if (cfg.required !== data.required) {
			cfg.required = data.required;
		}

		if (cfg.required && !_.isEmpty(value)) {
			cfg.value = value;
		}

		if (!cfg.required && !_.isEqual(value, cfg.value)) {
			cfg.value = value;
		}

		if (!_.isEqual(cfg.dataType, data.dataType)) {
			cfg.dataType = data.dataType;
		}

		if (!_.isEqual(cfg.key_name, data.key_name)) {
			cfg.key_name = data.key_name;
		}

		if (!_.isEqual(cfg.key_description, data.key_description)) {
			cfg.key_description = data.key_description;
		}

		await this.repository_.save(cfg);
		this.eventBusService_.emit("system-config.updated", cfg);

		return cfg;
	}

	async batchUpdate(datas: { key: string; value: any }[]) {
		const cfgs = await this.repository_.find({
			where: { key: In(datas.map((d) => d.key)) },
		});

		const updates = cfgs.map((cfg) => {
			const data = datas.find((d) => d.key === cfg.key);
			if (data && data.value !== cfg.value) {
				cfg.value = data.value;
			}

			return cfg;
		});

		await this.repository_.save(updates);

		// updates.forEach((cfg) => {
		// 	this.eventBusService_.emit("system-config.updated", cfg);
		// });

		return updates;
	}

	async listByType(type: string) {
		return this.repository_.find({ where: { type: type as ConfigType } });
	}

	async listByProvider(provider: string, type?: string, select: string[] = []) {
		var where = {};

		if (provider) {
			where = { provider: provider as ProviderType };
		}

		if (type) {
			where = { ...where, type: type as ConfigType };
		}

		if (select && select.length > 0) {
			where = {
				...where,
				key: ILike(Any(select.map((s) => `%${s}%`))),
			};
		}

		return this.repository_.find({
			where,
		});
	}

	async updateOrCreate(data: any) {
		const cfg = await this.findByKey(data.key);
		if (cfg) {
			await this.update(data);
		} else {
			await this.create(data);
		}
	}
}

export default SystemConfigService;
