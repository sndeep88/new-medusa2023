import { BaseEntity, generateEntityId } from "@medusajs/medusa";
import { Entity, Column, BeforeInsert, Index } from "typeorm";

export enum TrackingType {
	Fb = "facebook",
	Gg = "google",
	Tiktok = "tiktok",
}

@Entity()
export class FbPixel extends BaseEntity {
	@Column({ unique: true })
	@Index()
	pixel_id: string;

	@Column()
	enabled: boolean;

	@Column({ type: "enum", enum: TrackingType, default: TrackingType.Fb })
	type: TrackingType;

	@BeforeInsert()
	private beforeInsert() {
		this.id = generateEntityId(this.id, "fbp");
	}
}

export default FbPixel;
