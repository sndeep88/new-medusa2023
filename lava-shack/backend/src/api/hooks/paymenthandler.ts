import {
	CartService,
	EventBusService,
	OrderService,
	PaymentStatus,
} from "@medusajs/medusa";
import { Request, Response } from "express";
import fetch from "node-fetch";
import SystemConfigService from "services/system-config";

export default async (req: Request, res: Response) => {
	var body = req.body;

	// const event = req.scope.resolve<EventBusService>("eventBusService");

	// await event.emit("payment.create", { ...body });

	// const configService = req.scope.resolve<SystemConfigService>(
	// 	"systemConfigService"
	// );
	// const config = await configService.listByProvider("mpay");
	// const mpay_url = config.find((cfg) => cfg.key === "mpay_url")?.value;
	// const mpay_privateKey = config.find(
	// 	(cfg) => cfg.key === "mpay_privateKey"
	// )?.value;
	// const connection_token = config.find(
	// 	(cfg) => cfg.key === "mpay_connection-token"
	// )?.value;
	// const ip_address = config.find((cfg) => cfg.key === "mpay_ipAddress")?.value;

	// if (!mpay_url || !mpay_privateKey || !connection_token || !ip_address) {
	// 	res.status(500).json({ message: "Missing config for mpay" });
	// 	return;
	// }

	// var url = new URL(mpay_url);

	// var headers = {
	// 	"content-type": "application/x-www-form-urlencoded",
	// 	authorization:
	// 		"Basic " + Buffer.from(`${mpay_privateKey}:`).toString("base64"),
	// 	accept: "application/json",
	// };

	// console.log({ headers, url });

	// const [exp_month, exp_year] = body.card.card_expDate.split("/");

	// console.log({ ip: req.ip, userAgent: req.get("User-Agent"), ips: req.ips });

	// let data: Record<string, string> = {
	// 	"card[number]": body.card.card_number.replace(/\s/g, ""),
	// 	"card[exp_month]": exp_month,
	// 	"card[exp_year]": exp_year,
	// 	"card[cvc]": body.card.card_cvc,
	// 	email: body.card.email,
	// 	"'connection_token'": connection_token,
	// 	amount: body.amount,
	// 	enterprise_access: "1",
	// 	customer_user_agent: body.agent,
	// 	customer_ip: IP_ADDRESS,
	// 	"billing_details[email]": body.card.email,
	// 	"billing_details[firstname]": body.card.shipping_address.first_name,
	// 	"billing_details[lastname]": body.card.shipping_address.last_name,
	// 	"billing_details[country]": body.card.shipping_address.country_code,
	// 	"billing_details[city]": body.card.shipping_address.city,
	// 	"billing_details[address_postcode]": body.card.shipping_address.postal_code,
	// 	"billing_details[address_line1]": body.card.shipping_address.address_1,
	// };

	// let apiUrl = `${url.protocol}//${mpay_privateKey}:@${url.hostname}${url.pathname}`;

	// console.log({ url: apiUrl, urlencode: new URLSearchParams(data) });
	// var result = await fetch(apiUrl + "/token", {
	// 	method: "POST",
	// 	headers,
	// 	body: new URLSearchParams(data),
	// })
	// 	.then((res) => res.json())
	// 	.catch((err) => console.error({ err }));

	// console.log(result);
	// if (!result || !result.status) {
	// 	res.status(500).json(result.error);
	// 	return;
	// }

	// data = {
	// 	MyUserToken: result.token,
	// 	amount: body.amount,
	// };

	// console.log(apiUrl + "/charges", { data });
	// result = await fetch(apiUrl + "/charges", {
	// 	method: "POST",
	// 	headers,
	// 	body: new URLSearchParams(data),
	// })
	// 	.then((res) => res.json())
	// 	.catch((err) => console.error({ err }));

	// console.log({ result });

	// if (!result || !result.status) {
	// 	res.status(500).json(result.error);
	// 	return;
	// }

	// async function capturePayment(req, cartId) {
	// 	var cartService = req.scope.resolve("cartService");
	// 	var orderService = req.scope.resolve("orderService");
	// 	var manager = req.scope.resolve("manager");
	// 	let capturedOrder = undefined;

	// 	await manager.transaction(async (session) => {
	// 		// var cart = await cartService.withTransaction(session).retrieve(cartId);

	// 		const order = await orderService
	// 			.withTransaction(session)
	// 			.retrieveByCartId(cartId)
	// 			.catch((_) => undefined);

	// 		if (!order) {
	// 			await cartService
	// 				.withTransaction(session)
	// 				.setPaymentSession(cartId, "mpay");
	// 			await cartService.withTransaction(session).authorizePayment(cartId);
	// 			var createdOrder = await orderService
	// 				.withTransaction(session)
	// 				.createFromCart(cartId);

	// 			var capturepayment = await orderService
	// 				.withTransaction(session)
	// 				.capturePayment(createdOrder.id);

	// 			capturedOrder = capturepayment;
	// 		}
	// 	});

	// 	return capturedOrder;
	// }

	var { order_id, card, agent, amount, token, user_ip } = body;

	const eventBus = req.scope.resolve<EventBusService>("eventBusService");

	eventBus.emit("order.completed", {
		order_id,
		card,
		agent,
		amount,
		token,
		user_ip,
	});

	res.sendStatus(200);
};
