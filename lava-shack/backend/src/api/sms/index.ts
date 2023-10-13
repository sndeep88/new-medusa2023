import { EventBusService, wrapHandler } from "@medusajs/medusa";
import { Request, Response, Router } from "express";
import bodyParser = require("body-parser");
import TextgridService from "services/textgrid";

const route = Router();

export default (app: Router) => {
	app.use("/sms", route);

	route.post("/message", bodyParser.json(), wrapHandler(handleSms));

	return app;
};

async function handleSms(req: Request, res: Response) {
	const { to, cartId } = req.body;

	// console.log(req.body);

	// await textgridService.sendSms(to, "Hello from Medusa");

	const eventBus = req.scope.resolve<EventBusService>("eventBusService");

	await eventBus.emit("sms.remind-order", {
		order: { cart_id: cartId },
		to,
		type: "sms",
	});

	res.sendStatus(200);
}
