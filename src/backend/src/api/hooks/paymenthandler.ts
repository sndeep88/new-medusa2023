import { Request, Response } from "express";
import fetch from "node-fetch";

const MYUSER_URL = process.env.MYUSER_URL ?? "";
const MYUSER_SECRET_KEY = process.env.MYUSER_SECRET_KEY ?? "";
const MYUSER_CONNECTION_TOKEN = process.env.MYUSER_CONNECTION_TOKEN ?? "";
const IP_ADDRESS = process.env.IP_ADDRESS ?? "";

export default async (req: Request, res: Response) => {
	var body = JSON.parse(req.body.toString("utf8"));

	console.log({ body });

	var url = new URL(MYUSER_URL);
	// url.username = MYUSER_SECRET_KEY + ":";

	var headers = {
		"content-type": "application/x-www-form-urlencoded",
		authorization:
			"Basic " + Buffer.from(`${MYUSER_SECRET_KEY}:`).toString("base64"),
		accept: "application/json",
	};

	console.log({ headers, url });

	const [exp_month, exp_year] = body.card.card_expDate.split("/");

	console.log({ ip: req.ip, userAgent: req.get("User-Agent"), ips: req.ips });

	let data: Record<string, string> = {
		"card[number]": body.card.card_number.replace(/\s/g, ""),
		"card[exp_month]": exp_month,
		"card[exp_year]": exp_year,
		"card[cvc]": body.card.card_cvc,
		email: body.card.email,
		"'connection_token'": MYUSER_CONNECTION_TOKEN,
		amount: body.amount,
		enterprise_access: "1",
		customer_user_agent: body.agent,
		customer_ip: IP_ADDRESS,
		"billing_details[email]": body.card.email,
		"billing_details[firstname]": body.card.shipping_address.first_name,
		"billing_details[lastname]": body.card.shipping_address.last_name,
		"billing_details[country]": body.card.shipping_address.country_code,
		"billing_details[city]": body.card.shipping_address.city,
		"billing_details[address_postcode]": body.card.shipping_address.postal_code,
		"billing_details[address_line1]": body.card.shipping_address.address_1,
	};

	let apiUrl = `${url.protocol}//${MYUSER_SECRET_KEY}:@${url.hostname}${url.pathname}`;

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
		res.status(500).json(result.error);
		return;
	}

	data = {
		MyUserToken: result.token,
		amount: body.amount,
	};

	console.log(apiUrl + "/charges", { data });
	result = await fetch(apiUrl + "/charges", {
		method: "POST",
		headers,
		body: new URLSearchParams(data),
	})
		.then((res) => res.json())
		.catch((err) => console.error({ err }));

	console.log({ result });

	if (!result || !result.status) {
		res.status(500).json(result.error);
		return;
	}

	async function capturePayment(req, cartId) {
		var cartService = req.scope.resolve("cartService");
		var orderService = req.scope.resolve("orderService");
		var manager = req.scope.resolve("manager");
		let capturedOrder = undefined;

		await manager.transaction(async (session) => {
			// var cart = await cartService.withTransaction(session).retrieve(cartId);

			const order = await orderService
				.withTransaction(session)
				.retrieveByCartId(cartId)
				.catch((_) => undefined);

			if (!order) {
				await cartService
					.withTransaction(session)
					.setPaymentSession(cartId, "mpay");
				await cartService.withTransaction(session).authorizePayment(cartId);
				var createdOrder = await orderService
					.withTransaction(session)
					.createFromCart(cartId);

				var capturepayment = await orderService
					.withTransaction(session)
					.capturePayment(createdOrder.id);

				capturedOrder = capturepayment;
			}
		});

		return capturedOrder;
	}

	var cartId = body.cartId;

	try {
		var order = await capturePayment(req, cartId);
		res.status(200).json(order);
	} catch (err) {
		console.error({ err });
		res.status(500).json({ err });
	}
};
