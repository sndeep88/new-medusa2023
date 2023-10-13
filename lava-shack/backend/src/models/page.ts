import { BaseEntity, generateEntityId } from "@medusajs/medusa";
import {
	BeforeInsert,
	Column,
	Entity,
	Index,
	JoinTable,
	ManyToOne,
} from "typeorm";
import * as _ from "lodash";
import { PageTag } from "./page-tag";

export enum PageStatus {
	PUBLISH = "publish",
	UNPUBLISH = "unpublish",
}

@Entity()
export class Page extends BaseEntity {
	@Column()
	title: string;

	@Column()
	slug: string;

	@Column({ type: "enum", enum: PageStatus, default: PageStatus.PUBLISH })
	status: PageStatus;

	@Column({ type: "text" })
	content: string;

	@Column()
	@Index()
	tag_id: string;

	@ManyToOne(() => PageTag, (tag) => tag.pages, { onDelete: "SET NULL" })
	tag: PageTag;

	@BeforeInsert()
	private beforeInsert() {
		this.id = generateEntityId(this.id, "page");

		this.slug = _.kebabCase(this.title);
	}
}

export default Page;
