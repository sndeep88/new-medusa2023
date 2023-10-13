import { PageTagCreateInput, TransactionBaseService } from "@medusajs/medusa";
import PageTagRepository from "repositories/page-tag";

export class PageTagService extends TransactionBaseService {
	protected repository_: typeof PageTagRepository;

	constructor(container, options) {
		super(container, options);

		this.repository_ = container.pageTagRepository;
	}

	async getDefaultTag() {
		return this.repository_.findOne({ where: { code: "site-info" } });
	}

	async getAll() {
		return this.repository_.find();
	}

	async create(data: PageTagCreateInput) {
		const pageTagDb = this.repository_.findOne({
			where: { code: data.code },
		});

		if (pageTagDb) {
			throw new Error("Page tag already exists");
		}

		const pageTag = this.repository_.create({
			name: data.name,
			code: data.code,
		});

		await this.repository_.save(pageTag);

		return pageTag;
	}

	async delete(id: string) {
		await this.repository_.delete(id);

		return { id };
	}
}

export default PageTagService;
