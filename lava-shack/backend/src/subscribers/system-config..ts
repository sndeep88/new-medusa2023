import { ConfigType, ProviderType } from "../models/system-config";
import SystemConfigService from "services/system-config";
import { Client, Environment } from "square";
import Stripe from "stripe";
import { v4 } from "uuid";

const backendUrl = process.env.BACKEND_URL || "http://localhost:9000";

export class SystemConfigSubcriber {
	systemConfigService_: SystemConfigService;

	constructor({ eventBusService, systemConfigService }) {
		this.systemConfigService_ = systemConfigService;

		eventBusService.subscribe(
			"system-config.updated",
			this.handleSystemConfigUpdated
		);
	}

	handleSystemConfigUpdated = async ({ type, provider, value, key }) => {
		switch (type) {
			case ConfigType.Payment:
				this.handlePaymentConfigUpdated({ provider, value, key });
				break;
			default:
				break;
		}
	};

	handlePaymentConfigUpdated = async ({ provider, value, key }) => {
		switch (provider) {
			case ProviderType.STRIPE:
				this.handleStripeConfigUpdated({ value, key });
				break;
			case ProviderType.SQUARE:
				this.handleSquareConfigUpdated({ value, key });
				break;
			default:
				break;
		}
	};

	handleStripeConfigUpdated = async ({
		value,
		key,
	}: {
		key: string;
		value: any;
	}) => {
		if (key.includes("secretKey")) {
			const stripeConf = await this.systemConfigService_.listByProvider(
				ProviderType.STRIPE
			);
			const whId = stripeConf.find(
				(cfg) => cfg.key === "stripe_webhookId"
			).value;
			const stripeClient = new Stripe(value, { apiVersion: "2023-08-16" });

			const whEndpoints = await stripeClient.webhookEndpoints.list();
			console.log("-------------------");
			console.log({ whEndpoints });

			const whEndpoint = whEndpoints.data.find(
				(wh) => wh.url.includes(backendUrl) && wh.id === whId
			);

			console.log({ whEndpoint });

			if (!whEndpoint) {
				const webbook = await stripeClient.webhookEndpoints.create({
					url: `${backendUrl}/hooks/stripe`,
					enabled_events: [
						"payment_intent.succeeded",
						"payment_intent.amount_capturable_updated",
						"payment_intent.payment_failed",
						"payment_intent.canceled",
						"payment_intent.created",
						"payment_intent.partially_funded",
						"payment_intent.processing",
						"payment_intent.requires_action",
					],
				});

				await this.systemConfigService_.batchUpdate([
					{ key: "stripe_webhookId", value: webbook.id },
					{ key: "stripe_webhookSecret", value: webbook.secret },
				]);
			}
		}
	};

	handleSquareConfigUpdated = async ({ key, value }) => {
		if (key.includes("accessToken")) {
			const squareCfg = await this.systemConfigService_.listByProvider(
				ProviderType.SQUARE
			);
			const environment = (squareCfg.find((cfg) =>
				cfg.key.includes("environment")
			).value ?? "sandbox") as Environment;

			const client = new Client({
				environment,
				accessToken: value,
			});

			if (client) {
				// update location
				const locations = await client.locationsApi.listLocations();
				const locationId = locations.result.locations[0].id;
				const location = squareCfg.find(
					(cfg) => cfg.value === locationId && cfg.key.includes("locationId")
				);

				if (!location) {
					let newLocation = locations.result.locations[0];
					if (locations.result.locations.length > 1) {
						const locationCreateResponse =
							await client.locationsApi.createLocation({
								location: {
									name: "Default Location",
								},
							});
						newLocation = locationCreateResponse.result.location;
					}
					await this.systemConfigService_.batchUpdate([
						{ key: "square_locationId", value: newLocation.id },
					]);
				}

				//* update webhook
				const webbookSecret = squareCfg.find((cfg) =>
					cfg.key.includes("webhookSignature")
				);

				const webhooks =
					await client.webhookSubscriptionsApi.listWebhookSubscriptions();

				const webhook = webhooks.result.subscriptions
					? webhooks.result.subscriptions.find((wh) =>
							wh.notificationUrl.includes(backendUrl)
					  )
					: null;

				if (webhook && webhook.signatureKey !== webbookSecret?.value) {
					await this.systemConfigService_.batchUpdate([
						{ key: "square_webhookSignature", value: webhook.signatureKey },
					]);
				} else {
					const webhookResponse =
						await client.webhookSubscriptionsApi.createWebhookSubscription({
							subscription: {
								name: "Default Webhook",
								notificationUrl: `${backendUrl}/hooks/square/webhook`,
								eventTypes: ["payment.created", "payment.updated"],
							},
							idempotencyKey: v4(),
						});

					const newWebhook = webhookResponse.result.subscription;

					await this.systemConfigService_.batchUpdate([
						{ key: "square_webhookUrl", value: newWebhook.notificationUrl },
						{ key: "square_webhookSignature", value: newWebhook.signatureKey },
					]);
				}
			}
		}
	};
}

export default SystemConfigSubcriber;
