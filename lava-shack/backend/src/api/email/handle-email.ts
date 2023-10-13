import { EventBusService } from "@medusajs/medusa";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	const body = req.body;

	const eventBus = req.scope.resolve<EventBusService>("eventBusService");

	await eventBus.emit("email.remind-order", {
		order: { cart_id: body.cartId },
		to: body.email,
		type: "email",
	});

	res.status(200).json({ status: "ok" });
};
