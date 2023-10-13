import { StoreService, TransactionBaseService } from "@medusajs/medusa";
import ExtendStoreRepository from "../repositories/extend-store";
import ExtendStore from "../models/extend-store";

type UpdateData = {
	bannerImage?: string;
	siteIcon?: string;
	storeUrl?: string;
	logo?: string;
};

export class ExtendStoreService extends TransactionBaseService {
	protected repository_: typeof ExtendStoreRepository;
	private storeService_: StoreService;

	constructor(container, options) {
		super(container, options);

		this.storeService_ = container.storeService;
		this.repository_ = container.extendStoreRepository;
	}

	async create(data?: UpdateData) {
		const store = await this.storeService_.retrieve();

		const extendStore = this.repository_.create({
			store_id: store.id,
			bannerImage: data?.bannerImage || null,
			siteIcon: data?.siteIcon || null,
			logo: data?.logo || null,
		});

		await this.repository_.save(extendStore);

		return extendStore;
	}

	async update(data: UpdateData) {
		const store = await this.storeService_.retrieve();

		const extendStore = await this.getOrCreate(store.id);

		if (data.bannerImage) {
			extendStore.bannerImage = data.bannerImage;
		}
		if (data.siteIcon) {
			extendStore.siteIcon = data.siteIcon;
		}
		if (data.storeUrl) {
			extendStore.storeUrl = data.storeUrl;
		}
		if (data.logo) {
			extendStore.logo = data.logo;
		}

		await this.repository_.save(extendStore);

		return extendStore;
	}

	async get() {
		const store = await this.storeService_.retrieve();

		const extendStore = await this.getOrCreate(store.id);

		return extendStore;
	}

	async retrieve() {
		const store = await this.storeService_.retrieve();

		const extendStore = await this.repository_.findOne({
			where: { store_id: store.id },
		});

		return {...extendStore, store_name: store.name};
	}

	private async getOrCreate(store_id: string) {
		const extendStore = await this.repository_.findOne({
			where: { store_id },
		});

		if (!extendStore) {
			return this.create();
		}

		return extendStore;
	}
}

export default ExtendStoreService;
