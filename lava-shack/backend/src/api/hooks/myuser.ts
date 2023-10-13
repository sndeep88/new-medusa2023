import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	var body = JSON.parse(req.body.toString("utf8"));

	// var service: MyUserPay = req.scope.resolve("myuserPaymentProcessorService");

	// function isPaymentCollection(id) {
	// 	return id && id.startsWith("paycol");
	// }

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
	} catch (err) {
		console.error({ err });
	}
                    
	// console.log({ order });

	res.status(200).json(order);
};
