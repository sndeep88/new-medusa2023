import { BaseEntity, Product, generateEntityId } from "@medusajs/medusa";
import { BeforeInsert, Column, Entity, Index } from "typeorm";
import { Max, Min } from "class-validator";

@Entity()
export class ReviewScore extends BaseEntity {
	@Column({ type: "varchar", nullable: true })
	@Index()
	product_id: string;

	@Column({ type: "float" })
	@Min(1)
	@Max(5)
	score: number;

	@Column({ default: 0 })
	amount: number;

	@BeforeInsert()
	private beforeInsert() {
		this.id = generateEntityId(this.id, "rs");
	}
}

export default ReviewScore;
