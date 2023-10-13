import { BaseEntity, generateEntityId } from "@medusajs/medusa";
import {
	BeforeInsert,
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
} from "typeorm";
import { ProductReview } from "./review";

@Entity()
export class ReviewImage extends BaseEntity {
	@ManyToOne(() => ProductReview, (review) => review.images, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "review_id" })
	review: ProductReview;

	@Index()
	@Column()
	review_id: string;

	@Column({ type: "varchar", nullable: false })
	url: string;

	@BeforeInsert()
	private beforeInsert(): void {
		this.id = generateEntityId(this.id, "reImg");
	}
}
