import { BaseEntity, Product } from "@medusajs/medusa";
import {
	BeforeInsert,
	Column,
	Entity,
	Index,
	JoinColumn,
	OneToOne,
} from "typeorm";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class ProductDescription extends BaseEntity {
	@Column({ type: "text" })
	content: string;

	@Column({ type: "varchar", nullable: false })
	product_id: string;

	// @OneToOne(() => Product, { onDelete: "CASCADE" })
	// product: Product;

	@BeforeInsert()
	private beforeInsert() {
		this.id = generateEntityId(this.id, "pd");
	}
}
