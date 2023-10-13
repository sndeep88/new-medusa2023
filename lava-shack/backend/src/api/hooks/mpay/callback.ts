import { Request, Response } from "express";
import SystemConfigService from "services/system-config";
import {
	CartService,
	EventBusService,
	Logger,
	OrderService,
} from "@medusajs/medusa";
import { createHash, decryptCard } from "./utils";
import * as _ from "lodash";
import fetch from "node-fetch";

export default async (req: Request, res: Response) => {
	const token = req.params.token;
	const q = req.query;

	if (q.error) {
		res.status(500).json({
			status: false,
			error: q.error,
		});
		return;
	}

	const [time, hashData] = token.split("-");

	const data = Buffer.from(hashData, "base64").toString();

	const systemConfigService_: SystemConfigService = req.scope.resolve(
		"systemConfigService"
	);
	const logger_: Logger = req.scope.resolve("logger");

	const config = await systemConfigService_.listByProvider("mpay");
	const mpay_url = config.find((cfg) => cfg.key === "mpay_url")?.value;

	const mpay_privateKey = config.find(
		(cfg) => cfg.key === "mpay_privateKey"
	)?.value;
	const connection_token = config.find(
		(cfg) => cfg.key === "mpay_connection-token"
	)?.value;

	if (!mpay_privateKey) {
		return res.status(500).json({ message: "Missing config for mpay" });
	}

	const cardJson = decryptCard(
		data,
		createHash(parseInt(time), mpay_privateKey)
	);
	console.log(q);

	const { card, amount, agent, user_ip, cart_id } = JSON.parse(cardJson);

	const requestData = {
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
		"paymentMethod[payment_method_id]": (q.paymentMethod as any)
			.payment_method_id as string,
		"paymentMethod[extra_custom_method_params][custom_method_status]": (
			q.paymentMethod as any
		).extra_custom_method_params.custom_method_status,
		"paymentMethod[extra_custom_method_params][payment_intent_id]": (
			q.paymentMethod as any
		).extra_custom_method_params.payment_intent_id,
		"paymentMethod[extra_custom_method_params][payment_method_id]": (
			q.paymentMethod as any
		).extra_custom_method_params.payment_method_id,
		"paymentMethod[extra_custom_method_params][payment_customer_id]": (
			q.paymentMethod as any
		).extra_custom_method_params.payment_customer_id,
		"paymentMethod[extra_custom_method_params][payment_intent_client_secret]": (
			q.paymentMethod as any
		).extra_custom_method_params.payment_intent_client_secret,
		"paymentMethod[extra_custom_method_params][isreserved_transaction]": (
			q.paymentMethod as any
		).extra_custom_method_params.isreserved_transaction,
	};

	if (!_.isEmpty(connection_token) && connection_token !== "default") {
		requestData["connection_token"] = connection_token;
	}

	// console.log({ req: new URLSearchParams(requestData) });

	var url = new URL(mpay_url);
	let apiUrl = `${url.protocol}//${mpay_privateKey}:@${url.hostname}${url.pathname}`;

	var headers = {
		"content-type": "application/x-www-form-urlencoded",
		authorization:
			"Basic " + Buffer.from(`${mpay_privateKey}:`).toString("base64"),
		accept: "application/json",
	};

	var result = await fetch(apiUrl + "/token", {
		method: "POST",
		headers,
		body: new URLSearchParams(requestData),
	})
		.then(async (res) => {
			const text = await res.text();
			return JSON.parse(text);
		})
		.catch((err) => {
			logger_.error(err);
			return undefined;
		});

	// console.log(result);
	if (!result || !result.status) {
		logger_.error(result?.error);
		res.status(400).json(result.error ? result : undefined);
		return;
	}

	const orderService: OrderService = req.scope.resolve("orderService");
	const cartService: CartService = req.scope.resolve("cartService");
	var order = await orderService
		.retrieveByCartId(cart_id)
		.catch((_) => undefined);

	if (!order) {
		await cartService.authorizePayment(cart_id);
		order = await orderService.createFromCart(cart_id);
	}

	const eventBus = req.scope.resolve<EventBusService>("eventBusService");

	eventBus.emit("order.completed", {
		order_id: order.id,
		agent,
		amount,
		token: result.token,
		user_ip,
	});

	res.status(200).json({ status: true, order });
};
