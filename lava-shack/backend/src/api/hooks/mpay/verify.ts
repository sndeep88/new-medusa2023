import { Request, Response } from "express";
import SystemConfigService from "services/system-config";
import { Logger } from "@medusajs/medusa";
import fetch from "node-fetch";
import * as _ from "lodash";
import { createHash, encryptCard } from "./utils";
import ExtendStoreService from "services/extend-store";

export default async (req: Request, res: Response) => {
	const systemConfigService_: SystemConfigService = req.scope.resolve(
		"systemConfigService"
	);
	const logger_: Logger = req.scope.resolve("logger");
	const extendStore =
		req.scope.resolve<ExtendStoreService>("extendStoreService");

	const store = await extendStore.retrieve();

	const config = await systemConfigService_.listByProvider("mpay");
	const mpay_url = config.find((cfg) => cfg.key === "mpay_url")?.value;

	const mpay_privateKey = config.find(
		(cfg) => cfg.key === "mpay_privateKey"
	)?.value;
	const connection_token = config.find(
		(cfg) => cfg.key === "mpay_connection-token"
	)?.value;

	if (!mpay_url || !mpay_privateKey) {
		logger_.error("Missing config for mpay");
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

	// console.log({ body: req.body });
	const { card, amount, agent, user_ip, cart_id } = req.body;

	const time = new Date().getTime();
	const token = encryptCard(
		JSON.stringify({ card, amount, agent, user_ip, cart_id }),
		createHash(time, mpay_privateKey)
	);

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
		"3ds_redirect_back": `${
			store.storeUrl
		}/api/mpay-callback/${time}-${Buffer.from(token).toString("base64")}`,
	};

	if (!_.isEmpty(connection_token) && connection_token !== "default") {
		data["connection_token"] = connection_token;
	}

	// console.log({ url: apiUrl, urlencode: new URLSearchParams(data) });
	var result = await fetch(apiUrl + "/token", {
		method: "POST",
		headers,
		body: new URLSearchParams(data),
	})
		.then(async (res) => {
			const text = await res.text();
			// console.log({ text });
			return JSON.parse(text);
		})
		// .then((res) => res.json())
		.catch((err) => logger_.error({ err }));

	// console.log(result);
	if (!result || !result.status) {
		// logger_.error(result.error);
		res.status(400).json(result);
		return;
	}

	res.status(200).json(result);
};
