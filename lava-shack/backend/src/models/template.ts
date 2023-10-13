import { BaseEntity, generateEntityId } from "@medusajs/medusa";
import { BeforeInsert, Column, Entity, Index } from "typeorm";

export enum TemplateType {
	EMAIL = "email",
	SMS = "sms",
}

@Entity()
export class Template extends BaseEntity {
	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	subject: string;

	@Column({ type: "text" })
	template: string;

	@Column({ type: "text", nullable: true })
	default_template: string;

	@Column({ type: "enum", enum: TemplateType, default: TemplateType.EMAIL })
	type: TemplateType;

	@Column({ type: "bool", default: true })
	enable: boolean;

	@Column({ nullable: true })
	@Index()
	code: string;

	@BeforeInsert()
	private beforeInsert() {
		this.id = generateEntityId(this.id, "etem");
	}
}

export default Template;
