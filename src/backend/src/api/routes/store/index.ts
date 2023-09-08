import * as cors from "cors";
import { Router } from "express";
import * as bodyParser from "body-parser";
import customRouteHandler from "./custom-route-handler";
import { wrapHandler } from "@medusajs/medusa";
import productDescription from "./product-description";


const router = Router();

export function attachStoreRoutes(storeRouter: Router): Router {
	storeRouter.use("/custom", router)

	router.post("/my-custom-path", wrapHandler(customRouteHandler));

	productDescription(storeRouter)

	return storeRouter;
}
