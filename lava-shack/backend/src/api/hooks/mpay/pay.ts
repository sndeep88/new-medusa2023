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

	var { order_id, agent, amount, token, user_ip } = body;

	const eventBus = req.scope.resolve<EventBusService>("eventBusService");

	eventBus.emit("order.completed", {
		order_id,
		agent,
		amount,
		token,
		user_ip,
	});

	res.sendStatus(200);
};
