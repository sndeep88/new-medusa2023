import * as fs from "fs";
import {
	CartService,
	Customer,
	Order,
	OrderService,
	TransactionBaseService,
} from "@medusajs/medusa";
import Mailgun, { Interfaces, MailgunMessageData } from "mailgun.js";
import formData = require("form-data");
import DiscountRepository from "@medusajs/medusa/dist/repositories/discount";
import * as handlebars from "handlebars";
import { join } from "path";
import SystemConfigService from "./system-config";
import { IMailgunClient } from "mailgun.js/Interfaces";
import ExtendStoreService from "./extend-store";

export class MailgunService extends TransactionBaseService {
	protected client_: Interfaces.IMailgunClient;
	private cartService_: CartService;
	private discountRepository_: typeof DiscountRepository;
	private systemConfig_: SystemConfigService;
	private orderService_: OrderService;
	private extendStoreService_: ExtendStoreService;

	private domain_: string;

	constructor(container, options) {
		super(container, options);

		this.systemConfig_ = container.systemConfigService;
		this.cartService_ = container.cartService;
		this.discountRepository_ = container.discountRepository;
		this.orderService_ = container.orderService;
		this.extendStoreService_ = container.extendStoreService;

		this.initClient();
	}

	private async initClient() {
		const mailgunCfg = await this.systemConfig_.listByProvider("mailgun");

		// console.log({ mailgunCfg });

		const api_key =
			mailgunCfg.find((cfg) => cfg.key === "mailgun_private-apiKey")?.value ??
			"";
		this.domain_ =
			mailgunCfg.find((cfg) => cfg.key === "mailgun_domain")?.value ?? "";

		// console.log({ domain: this.domain_, api_key });

		const mailgun = new Mailgun(formData);
		this.client_ = mailgun.client({
			username: "api",
			key: api_key,
		});
	}

	private async getClient(): Promise<IMailgunClient> {
		const mailgunCfg = await this.systemConfig_.listByProvider("mailgun");

		// console.log({ mailgunCfg });

		const api_key =
			mailgunCfg.find((cfg) => cfg.key === "mailgun_private-apiKey")?.value ??
			"";
		this.domain_ =
			mailgunCfg.find((cfg) => cfg.key === "mailgun_domain")?.value ?? "";

		// console.log({ dsomain: this.domain_, api_key });

		const mailgun = new Mailgun(formData);
		return mailgun.client({
			username: "api",
			key: api_key,
		});
	}

	private async sendMail(to: string, htmlToSend: string) {
		const client = await this.getClient();

		const messageData = {
			from: `Excited User <support@${this.domain_}>`,
			to,
			subject: "Hello",
			text: "Testing some Mailgun awesomeness!",
			html: htmlToSend,
		} as MailgunMessageData;

		client.messages
			.create(this.domain_, messageData)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	async sendRemindOrderMail(
		to: string,
		cartId: string,
		templateFile = "email"
	) {
		const cart = await this.getCart(cartId);
		const discount = await this.getDiscountByRegion(cart.region_id);
		const STORE_URL = await this.getStoreUrl();

		console.log({ discount });

		const discountAmount = discount?.rule.value ?? "";
		const discountType = discount?.rule.type ?? "";
		const textDiscount = (() => {
			switch (discountType) {
				case "percentage":
					return `${discountAmount}%`;
				case "fixed":
					return `$${discountAmount}`;
				case "free_shipping":
					return "Free shipping";
				default:
					return null;
			}
		})();

		var filepath = `${templateFile}.html`;
		if (!fs.existsSync(join(process.cwd(), "template", filepath))) {
			filepath = "email.html";
		}

		const htmlStream = fs.readFileSync(
			join(process.cwd(), "template", filepath)
		);

		const discountCode = discount?.code ?? null;

		const shipping_address = `${cart?.shipping_address?.address_1 ?? ""}, ${
			cart?.shipping_address?.city
		}`;
		const billing_address = `${cart?.billing_address?.address_1 ?? ""}, ${
			cart?.billing_address?.city
		}`;

		var template = handlebars.compile(htmlStream.toString());
		var htmlToSend = template({
			textDiscount,
			discountCode,
			url: `${STORE_URL}/cart/${cartId}`,
			first_name:
				cart?.shipping_address?.first_name ?? cart.customer?.first_name ?? "",
			last_name: cart?.shipping_address?.last_name ?? "",
			company_name: cart?.shipping_address?.company ?? "",
			company_addres: cart.shipping_address?.address_2,
			order_total: cart.total ?? 0,
			shipping_method: cart?.shipping_methods[0]?.shipping_option?.name ?? "",
			payment_method: cart?.payment_session?.provider_id ?? "",
			order: {
				id: cart.id,
				display_id: cart.id,
				total: cart.total,
				shipping_address,
				billing_address,
			},
			country: cart?.shipping_address?.country?.display_name ?? "",
		});

		console.log({ url: `${STORE_URL}/cart/${cartId}` });
		// console.log(htmlToSend);

		this.sendMail(to, htmlToSend);
	}

	async sendOrderPlaced(order_id: string) {
		var filepath = "confirm-order.html";
		if (!fs.existsSync(join(process.cwd(), "template", filepath))) {
			filepath = "email.html";
		}

		const order = await this.orderService_.retrieve(order_id, {
			relations: [
				"shipping_address",
				"billing_address",
				"shipping_methods",
				"shipping_methods.shipping_option",
				"customer",
				"payments",
			],
		});
		const STORE_URL = await this.getStoreUrl();

		const htmlStream = fs.readFileSync(
			join(process.cwd(), "template", filepath)
		);

		const shipping_address = `${order?.shipping_address?.address_1 ?? ""}, ${
			order?.shipping_address?.city
		}`;
		const billing_address = `${order?.billing_address?.address_1 ?? ""}, ${
			order?.billing_address?.city
		}`;

		console.log({ order });

		var template = handlebars.compile(htmlStream.toString());
		var htmlToSend = template({
			orderCode: order.display_id,
			url: `${STORE_URL}/order/confirmed/${order.id}`,
			first_name:
				order?.shipping_address?.first_name ?? order.customer?.first_name ?? "",
			last_name: order?.shipping_address?.last_name ?? "",
			company_name: order?.shipping_address?.company ?? "",
			company_address: order?.shipping_address?.address_2 ?? "",
			order_total: order.total ?? 0,
			shipping_method:
				order?.shipping_methods?.[0]?.shipping_option?.name ?? "",
			payment_method: order?.payments[0]?.provider_id ?? "",
			order: {
				id: order.id,
				display_id: order.id,
				total: order.total,
				shipping_address,
				billing_address,
			},
			country: order?.shipping_address?.country?.display_name ?? "",
		});

		this.sendMail(order.email, htmlToSend);
	}

	async sendCustomerCreated(customer: Customer) {
		var filename = "sign-up.html";
		if (!fs.existsSync(join(process.cwd(), "template", filename))) {
			filename = "email.html";
		}

		const STORE_URL = await this.getStoreUrl();

		const htmlStream = fs.readFileSync(
			join(process.cwd(), "template", filename)
		);

		var template = handlebars.compile(htmlStream.toString());
		var htmlToSend = template({
			first_name: `${customer.first_name}`,
			last_name: `${customer.last_name}`,
			url: `${STORE_URL}`,
		});

		this.sendMail(customer.email, htmlToSend);
	}

	async sendUserInvite(user: any) {
		var filename = "invitation.html";
		if (!fs.existsSync(join(process.cwd(), "template", filename))) {
			filename = "email.html";
		}

		const STORE_URL = await this.getStoreUrl();

		const htmlStream = fs.readFileSync(
			join(process.cwd(), "template", filename)
		);

		var template = handlebars.compile(htmlStream.toString());
		var htmlToSend = template({
			first_name: `${user.first_name}`,
			last_name: `${user.last_name}`,
			url: `${STORE_URL}`,
		});

		this.sendMail(user.email, htmlToSend);
	}

	private async getStoreUrl() {
		var extendStore = await this.extendStoreService_.retrieve();
		return extendStore.storeUrl ?? "";
	}

	private async getCart(cartId: string) {
		return await this.cartService_.retrieve(cartId, {
			relations: [
				"shipping_address",
				"billing_address",
				"shipping_methods",
				"shipping_methods.shipping_option",
				"customer",
				"payment_sessions",
			],
		});
	}

	private async getDiscountByRegion(regionId: string) {
		const discounts = await this.discountRepository_.find({
			where: { regions: { id: regionId } },
			relations: ["regions", "rule"],
			take: 1,
		});

		return discounts[0];
	}
}

export default MailgunService;
