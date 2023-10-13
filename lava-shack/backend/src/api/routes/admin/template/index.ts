import { wrapHandler } from "@medusajs/medusa";
import { Router } from "express";
import getTemplates from "./get-templates";
import updateTemplate from "./update-template";
import getTemplate from "./get-template";
import restoreDefault from "./restore-default";

const router = Router();

export default (adminRouter: Router) => {
	adminRouter.use("/templates", router);

	router.get("/", wrapHandler(getTemplates));
	router.post("/:id", wrapHandler(updateTemplate));
	router.post("/:id/default", wrapHandler(restoreDefault));
	router.get("/:id", wrapHandler(getTemplate));

	return adminRouter;
};
