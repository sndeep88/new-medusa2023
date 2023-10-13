import { Router } from "express";
import { wrapHandler } from "@medusajs/medusa";

import customRouteHandler from "./custom-route-handler";
import productDescriptionRoutes from "./product-description";
import extendStore from "./extend-store";
import fbPixelHandler from "./pixel";
import pageHandler from "./page";
import templateHandler from "./template";
import systemConfig from "./system-config";
import productReviews from "./product-reviews";

// Initialize a custom router

export function attachAdminRoutes(adminRouter: Router) {
	const router = Router();
	// Attach our router to a custom path on the admin router
	adminRouter.use("/custom", router);

	// Define a GET endpoint on the root route of our custom path
	router.get("/", wrapHandler(customRouteHandler));

	// Attach routes for onboarding experience, defined separately
	// onboardingRoutes(adminRouter);

	adminRouter = productDescriptionRoutes(adminRouter);
	adminRouter = extendStore(adminRouter);
	adminRouter = fbPixelHandler(adminRouter);
	adminRouter = pageHandler(adminRouter);
	adminRouter = templateHandler(adminRouter);
	adminRouter = systemConfig(adminRouter);
	adminRouter = productReviews(adminRouter);

	return adminRouter;
}
