import { BaseEntity, generateEntityId } from "@medusajs/medusa";
import { BeforeInsert, Column, Entity, Index } from "typeorm";

export enum ConfigType {
	Payment = "payment",
	Email = "email",
	Sms = "sms",
	GoogleApi = "google-api",
	Tracking = "tracking",
}

export enum ProviderType {
	MPAY = "mpay",
	STRIPE = "stripe",
	SQUARE = "square",
	MAILGUN = "mailgun",
	TEXTGRID = "textgrid",
	GOOGLE = "google",
	MEDUSA = "medusa",
	DUMMY = "dummy",
}

export enum DataType {
	String = "string",
	Number = "number",
	Boolean = "boolean",
}

@Entity()
export class SystemConfig extends BaseEntity {
	@Column({ type: "enum", enum: ConfigType, default: ConfigType.Payment })
	type: ConfigType;

	@Column({ type: "enum", enum: ProviderType, default: ProviderType.MEDUSA })
	provider: ProviderType;

	@Column()
	@Index()
	key: string;

	@Column()
	key_name: string;

	@Column()
	key_description: string;

	@Column()
	value: string;

	@Column({ type: "boolean", default: false })
	required: boolean;

	@Column({ type: "enum", enum: DataType, default: DataType.String })
	dataType: DataType;

	@BeforeInsert()
	private beforeInsert() {
		this.id = generateEntityId(this.id, "sysCfg_");
	}
}

export default SystemConfig;
