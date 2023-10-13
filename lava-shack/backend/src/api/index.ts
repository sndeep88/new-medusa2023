import { Router } from "express";
import cors = require("cors");
import bodyParser = require("body-parser");
import { authenticate, ConfigModule } from "@medusajs/medusa";
import { getConfigFile } from "medusa-core-utils";
import { attachStoreRoutes } from "./routes/store";
import { attachAdminRoutes } from "./routes/admin";
import hooks from "./hooks";
import email from "./email";
import sms from "./sms";

export default (rootDirectory: string): Router | Router[] => {
	const { configModule } = getConfigFile<ConfigModule>(
		rootDirectory,
		"medusa-config"
	);
	const { projectConfig } = configModule;

	// Set up our CORS options objects, based on config
	const storeCorsOptions = {
		origin: projectConfig.store_cors.split(","),
		credentials: true,
	};

	const adminCorsOptions = {
		origin: projectConfig.admin_cors.split(","),
		credentials: true,
	};

	// add your custom routes here
	const router = Router();

	router.use("/store", cors(storeCorsOptions), bodyParser.json());
	router.use(
		"/admin",
		cors(adminCorsOptions),
		bodyParser.json({ limit: "50mb" })
	);

	// Add authentication to all admin routes *except* auth and account invite ones
	router.use(/\/admin\/((?!auth)(?!invites).*)/, authenticate());

	// Set up routers for store and admin endpoints
	const storeRouter = Router();
	const adminRouter = Router();

	// Attach these routers to the root routes
	router.use("/store", storeRouter);
	router.use("/admin", adminRouter);

	// Attach custom routes to these routers
	attachStoreRoutes(storeRouter);
	attachAdminRoutes(adminRouter);

	hooks(router);
	email(router);
	sms(router);

	return router;
};
