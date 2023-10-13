import { BeforeInsert, Column, Entity, Index } from "typeorm";
import { BaseEntity, Store, generateEntityId } from "@medusajs/medusa";

@Entity()
export class ExtendStore extends BaseEntity {
	@Column()
	@Index()
	store_id: string;

	@Column({ nullable: true })
	bannerImage: string;

	@Column({ nullable: true })
	siteIcon: string;

	@Column({ nullable: true })
	logo: string;

	@Column({ nullable: true })
	storeUrl: string;

	@BeforeInsert()
	private beforeInsert() {
		this.id = generateEntityId(this.id, "exSt");
	}
}

export default ExtendStore;
