import {
	Page,
	PageCreateInput,
	TransactionBaseService,
} from "@medusajs/medusa";
import { PageStatus } from "../models/page";
import PageRepository from "repositories/page";
import PageTagService from "./page-tag";
import * as _ from "lodash";

export class PageService extends TransactionBaseService {
	protected repository_: typeof PageRepository;
	private pageTagService_: PageTagService;

	constructor(container, options) {
		super(container, options);

		this.repository_ = container.pageRepository;
		this.pageTagService_ = container.pageTagService;
	}

	async getAll() {
		return this.repository_.find();
	}

	async retrieve(tag?: string, select?: string[]) {
		var where = {};
		var options = {};

		if (select || select.length > 0) {
			options = { select };
		}

		if (tag) {
			where = { tag: { code: tag } };
		}

		where = { ...where, status: PageStatus.PUBLISH };

		options = { ...options, where };
		return this.repository_.find(options);
	}

	async getBySlug(slug: string) {
		return this.repository_.findOne({ where: { slug } });
	}

	async getbyId(id: string) {
		return this.repository_.findOne({ where: { id } });
	}

	async create(data: PageCreateInput) {
		const defaultTag = await this.pageTagService_.getDefaultTag();

		const page = this.repository_.create({
			title: data.title,
			content:
				typeof data.content === "string"
					? data.content
					: JSON.stringify(data.content),
			tag_id: defaultTag.id,
		});

		await this.repository_.save(page);
		await this.assignPageToDefaultPageTag(page);

		return page;
	}

	async update(pageId: string, data: any) {
		const page = await this.repository_.findOne({ where: { id: pageId } });

		if (!page) {
			throw new Error("Page not found");
		}

		console.log({ data });

		if (_.has(data, "title") && !_.isEqual(data.title, page.title)) {
			page.title = data.title;
		}

		if (_.isEmpty(page.slug)) {
			page.slug = _.kebabCase(page.title);
		}

		if (_.has(data, "slug") && !_.isEqual(data.slug, page.slug)) {
			page.slug = data.slug;
		}

		if (data.hasOwnProperty("status") && data.status !== page.status) {
			page.status = data.status;
		}

		if (data.hasOwnProperty("content") && data.content !== page.content) {
			page.content =
				typeof data.content === "string"
					? data.content
					: JSON.stringify(data.content);
		}

		await this.repository_.save(page);

		return page;
	}

	async assignPageToDefaultPageTag(page: Page) {
		const defaultTag = await this.pageTagService_.getDefaultTag();
		if (defaultTag) {
			page.tag = defaultTag;
			await this.repository_.save(page);
		} else {
			throw new Error("No default page tag found");
		}
	}

	async delete(pageId: string) {
		await this.repository_.delete(pageId);

		return { id: pageId };
	}
}

export default PageService;
