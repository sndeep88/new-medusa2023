import { wrapHandler } from "@medusajs/medusa";
import { Router } from "express";
import getAllHandler from "./get-all";
import createPage from "./create-page";
import updatePage from "./update-page";
import deletePage from "./delete-page";
import getById from "./get-by-id";

const router = Router();

export default (adminRouter: Router) => {
	adminRouter.use("/pages", router);

	router.get("/", wrapHandler(getAllHandler));
	router.post("/", wrapHandler(createPage));
	router.post("/:id", wrapHandler(updatePage));
	router.delete("/:id", wrapHandler(deletePage));
	router.get("/:id", wrapHandler(getById));

	return adminRouter;
};
