import { Router } from "express";
import customRouteHandler from "./custom-route-handler";
import { wrapHandler } from "@medusajs/medusa";
import productDescription from "./product-description";
import extendStore from "./extend-store-handler";
import fbPixelHandler from "./fb-pixel-handler";
import pageHandler from "./page-handler";
import systemConfig from "./system-config";
import productReviews from "./product-reviews";
import upload from "./upload";
import searchOrders from "./search-order"

const router = Router();

export function attachStoreRoutes(storeRouter: Router): Router {
	storeRouter.use("/custom", router);

	router.post("/", wrapHandler(customRouteHandler));

	productDescription(storeRouter);
	extendStore(storeRouter);
	fbPixelHandler(storeRouter);
	pageHandler(storeRouter);
	systemConfig(storeRouter);
	productReviews(storeRouter);
	upload(storeRouter);
	searchOrders(storeRouter)

	return storeRouter;
}
