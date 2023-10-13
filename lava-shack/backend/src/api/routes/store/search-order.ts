import {
	AdminGetOrdersParams,
	OrderService,
	transformQuery,
	wrapHandler,
} from "@medusajs/medusa";
import {
	defaultAdminOrdersFields,
	defaultAdminOrdersRelations,
} from "@medusajs/medusa/dist/types/orders";
import { Request, Response, Router } from "express";

const router = Router();

export default (storeRouter: Router) => {
	storeRouter.use("/search-orders", router);

	router.post("/", wrapHandler(searchOrder));
};

async function searchOrder(req: Request, res: Response) {
	const orderService: OrderService = req.scope.resolve("orderService");

	console.log({ ...req.body });

	const [orders, count] = await orderService.listAndCount(
		{ q: req.body.q },
		{
			select: [
				"id",
				"status",
				"display_id",
				"created_at",
				"email",
				"fulfillment_status",
				"payment_status",
				"total",
				"currency_code",
			],
			relations: [...defaultAdminOrdersRelations],
			skip: 0,
			take: 50,
		}
	);

	res.json({ orders, count });
}
