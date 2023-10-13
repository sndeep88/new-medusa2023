import { BaseEntity } from "@medusajs/medusa";
import {
	BeforeInsert,
	Column,
	Entity,
	Index,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
} from "typeorm";
import { Max, Min } from "class-validator";

import { generateEntityId } from "@medusajs/medusa/dist/utils";
import { ReviewImage } from "./review-image";

@Entity()
export class ProductReview extends BaseEntity {
	@Index()
	@Column({ type: "varchar", nullable: true })
	product_id: string;

	// @ManyToOne(() => Product)
	// @JoinColumn({ name: "product_id" })
	// product: Product;

	@Column({ type: "varchar", nullable: false })
	title: string;

	@Column({ type: "varchar", nullable: false })
	full_name: string;

	@Column({ type: "int" })
	@Min(1)
	@Max(5)
	rating: number;

	@Column({ type: "varchar", nullable: false })
	content: string;

	@OneToMany(() => ReviewImage, (image) => image.review)
	images: ReviewImage[];

	@Column({ default: true })
	enabled: boolean;

	@BeforeInsert()
	private beforeInsert(): void {
		this.id = generateEntityId(this.id, "prev");
	}
}
