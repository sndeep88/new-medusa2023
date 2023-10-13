import {
	CartService,
	Customer,
	OrderService,
	TransactionBaseService,
} from "@medusajs/medusa";
import fetch from "node-fetch";
import SystemConfigService from "./system-config";
import DiscountRepository from "@medusajs/medusa/dist/repositories/discount";
import ExtendStoreService from "./extend-store";
import * as fs from "fs";
import { join } from "path";
import * as handlebars from "handlebars";

const backendUrl = process.env.BACKEND_URL || "http://localhost:9000";

class TextgridService extends TransactionBaseService {
	protected client_: any;
	private cartService_: CartService;
	private discountRepository_: typeof DiscountRepository;
	private systemConfig_: SystemConfigService;
	private orderService_: OrderService;
	private extendStoreService_: ExtendStoreService;

	constructor(container, options) {
		super(container, options);

		this.systemConfig_ = container.systemConfigService;
		this.cartService_ = container.cartService;
		this.discountRepository_ = container.discountRepository;
		this.orderService_ = container.orderService;
		this.extendStoreService_ = container.extendStoreService;
	}

	private async getServiceInfo() {
		const mailgunCfg = await this.systemConfig_.listByProvider("textgrid");
		return {
			service_host: mailgunCfg.find(
				(cfg) => cfg.key === "textgrid_service-host"
			)?.value,
			from:
				mailgunCfg.find((cfg) => cfg.key === "textgrid_fromNumber")?.value ??
				"",
			account_sid:
				mailgunCfg.find((cfg) => cfg.key === "textgrid_accountSID")?.value ??
				"",
			auth_token:
				mailgunCfg.find((cfg) => cfg.key === "textgrid_authToken")?.value ?? "",
		};
	}

	private authHeader(auth_token: string, account_sid: string): string {
		return Buffer.from(`${account_sid}:${auth_token}`).toString("base64");
	}

	private async sendSms(text: string, to: string) {
		const { service_host, account_sid, auth_token, from } =
			await this.getServiceInfo();

		const url = `Accounts/${account_sid}/Messages.json`;

		const headers = {
			authorization: `Bearer ${this.authHeader(auth_token, account_sid)}`,
			"content-type": "application/json",
		};

		const body = {
			body: text,
			from,
			to,
			statusCallback: backendUrl + "/callback/message",
		};

		console.log({ body });

		try {
			const response = await fetch(`${service_host}/${url}`, {
				method: "POST",
				headers,
				body: JSON.stringify(body),
			});

			console.log(response.status);

			const data = await response.json();
			console.log({ data, status: response.status });
		} catch (err) {
			console.error(err);
		}
	}

	async sendRemindOrder(to: string, cart_id: string, templateCode: string) {
		const cart = await this.getCart(cart_id);
		const discount = await this.getDiscountByRegion(cart.region_id);
		const STORE_URL = await this.getStoreUrl();

		// console.log({ discount });

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

		var filepath = `remind-order.txt`;
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
			url: `${STORE_URL}/cart/${cart_id}`,
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

		this.sendSms(htmlToSend, to);
	}

	async sendOrderPlaced(order_id: string) {
		var filepath = "confirm-order.txt";
		if (!fs.existsSync(join(process.cwd(), "template", filepath))) {
			filepath = "email.txt";
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

		const textStream = fs.readFileSync(
			join(process.cwd(), "template", filepath)
		);

		const shipping_address = `${order?.shipping_address?.address_1 ?? ""}, ${
			order?.shipping_address?.city
		}`;
		const billing_address = `${order?.billing_address?.address_1 ?? ""}, ${
			order?.billing_address?.city
		}`;

		var template = handlebars.compile(textStream.toString());
		var textToSend = template({
			orderCode: order.display_id,
			url: `${STORE_URL}/order/confirmed/${order.id}`,
			first_name:
				order?.shipping_address?.first_name ?? order.customer?.first_name ?? "",
			last_name: order?.shipping_address?.last_name ?? "",
			company_name: order?.shipping_address?.company ?? "",
			company_address: order?.shipping_address?.address_2 ?? "",
			order_total: order.total ?? 0,
			shipping_method: order?.shipping_methods[0]?.shipping_option?.name ?? "",
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

		this.sendSms(textToSend, order.shipping_address?.phone);
	}

	async sendCustomerCreated(customer: Customer) {
		var filename = "sign-up.txt";
		if (!fs.existsSync(join(process.cwd(), "template", filename))) {
			filename = "email.txt";
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

		this.sendSms(htmlToSend, customer.phone);
	}

	async sendUserInvite(user: any) {
		var filename = "invitation.txt";
		if (!fs.existsSync(join(process.cwd(), "template", filename))) {
			filename = "email.txt";
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

		this.sendSms(htmlToSend, user.phone);
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

export default TextgridService;
