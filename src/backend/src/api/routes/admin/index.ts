import { Router } from "express";
import { wrapHandler } from "@medusajs/medusa";

import customRouteHandler from "./custom-route-handler";
import productDescriptionRoutes from "./product-description";

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

	return adminRouter;
}
