import { Logger, OrderService } from "@medusajs/medusa";
import { PaymentService } from "medusa-interfaces";
import SystemConfigService from "services/system-config";
import fetch from "node-fetch";
import { EntityManager } from "typeorm";
import * as _ from "lodash";

export class OrderSubcriber {
	paymentService_: PaymentService;
	orderService_: OrderService;
	systemConfigService_: SystemConfigService;
	logger_: Logger;
	manager_: EntityManager;

	constructor({
		orderService,
		paymentService,
		systemConfigService,
		logger,
		manager,
		eventBusService,
	}) {
		this.orderService_ = orderService;
		this.paymentService_ = paymentService;
		this.systemConfigService_ = systemConfigService;
		this.logger_ = logger;
		this.manager_ = manager;

		eventBusService.subscribe("order.completed", this.handleOrderCreated);
	}

	handleOrderCreated = async ({
		order_id,
		card,
		agent,
		amount,
		token,
		user_ip,
	}) => {
		console.log({ order_id, card });

		const config = await this.systemConfigService_.listByProvider("mpay");
		const mpay_url = config.find((cfg) => cfg.key === "mpay_url")?.value;

		const mpay_privateKey = config.find(
			(cfg) => cfg.key === "mpay_privateKey"
		)?.value;
		const connection_token = config.find(
			(cfg) => cfg.key === "mpay_connection-token"
		)?.value;

		if (!mpay_url || !mpay_privateKey) {
			this.logger_.error("Missing config for mpay");
			return;
		}

		var url = new URL(mpay_url);

		var headers = {
			"content-type": "application/x-www-form-urlencoded",
			authorization:
				"Basic " + Buffer.from(`${mpay_privateKey}:`).toString("base64"),
			accept: "application/json",
		};

		let data: Record<string, string> = {};

		let apiUrl = `${url.protocol}//${mpay_privateKey}:@${url.hostname}${url.pathname}`;

		if (!token) {
			data = {
				"card[number]": card.card_number.replace(/\s/g, ""),
				"card[exp_month]": card.card_expMon,
				"card[exp_year]": card.card_expYear,
				"card[cvc]": card.card_cvc,
				email: card.email,
				amount: amount.toString(),
				enterprise_access: "1",
				customer_user_agent: agent,
				customer_ip: user_ip,
				"billing_details[email]": card.email,
				"billing_details[firstname]": card.shipping_address.first_name,
				"billing_details[lastname]": card.shipping_address.last_name,
				"billing_details[country]": card.shipping_address.country_code,
				"billing_details[city]": card.shipping_address.city,
				"billing_details[address_postcode]": card.shipping_address.postal_code,
				"billing_details[address_line1]": card.shipping_address.address_1,
			};

			if (!_.isEmpty(connection_token) && connection_token !== "default") {
				data["connection_token"] = connection_token;
			}

			console.log({ url: apiUrl, urlencode: new URLSearchParams(data) });
			var result = await fetch(apiUrl + "/token", {
				method: "POST",
				headers,
				body: new URLSearchParams(data),
			})
				.then((res) => res.json())
				.catch((err) => console.error({ err }));

			console.log(result);
			if (!result || !result.status) {
				this.logger_.error(result.error);
				return;
			}

			data = {
				MyUserToken: result.token,
				amount: amount.toString(),
			};
		} else {
			data = {
				token,
				amount: amount.toString(),
			};
		}

		await this.handleOrderCapture({ order_id, apiUrl, headers, data });
	};

	private handleOrderCapture = async ({ order_id, apiUrl, headers, data }) => {
		const result = await fetch(apiUrl + "/charges", {
			method: "POST",
			headers,
			body: new URLSearchParams(data),
		})
			.then((res) => res.json())
			.catch((err) => console.error({ err }));

		console.log({ result });

		if (!result || !result.status) {
			this.logger_.error(result.error);
			return;
		}

		await this.manager_.transaction(async (session) => {
			await this.orderService_.capturePayment(order_id);
		});
	};
}

export default OrderSubcriber;
