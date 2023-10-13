import { wrapHandler } from "@medusajs/medusa";
import { Router } from "express";
import getAllConfigs from "./get-all";
import getConfig from "./get-by-key";
import updateConfig from "./update-config";

const router = Router();

export default (adminRouter: Router) => {
	adminRouter.use("/system-config", router);

	router.get("/", wrapHandler(getAllConfigs));
	router.get("/:key", wrapHandler(getConfig));
	router.post("/", wrapHandler(updateConfig));

	return adminRouter;
};
