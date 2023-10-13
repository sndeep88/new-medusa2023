import { BaseEntity, generateEntityId } from "@medusajs/medusa";
import { BeforeInsert, Column, Entity, Index, OneToMany } from "typeorm";
import { Page } from "./page";

@Entity()
export class PageTag extends BaseEntity {
	@Column()
	name: string;

	@Column()
	@Index()
	code: string;

	@OneToMany(() => Page, (page) => page.tag)
	pages: Page[];

	@BeforeInsert()
	private beforeInsert() {
		this.id = generateEntityId(this.id, "ptag");
	}
}

export default PageTag;
