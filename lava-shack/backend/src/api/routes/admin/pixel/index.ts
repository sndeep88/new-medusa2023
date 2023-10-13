import { wrapHandler } from "@medusajs/medusa";
import { Router } from "express";

import getFbPixel from "./get-pixel-handler";
import createFbPixel from "./create-pixel-handler";
import deleteFbPixel from "./delete-id-pixel-handler";
import getFbPixelById from "./get-id-pixel-handler";
import updateFbPixel from "./update-id-pixel-handler";

const router = Router();

export default (adminRouter: Router) => {
	adminRouter.use("/pixels", router);

	router.get("/", wrapHandler(getFbPixel));
	router.post("/", wrapHandler(createFbPixel));
	router.delete("/:id", wrapHandler(deleteFbPixel));
	router.get("/:id", wrapHandler(getFbPixelById));
	router.post("/:id", wrapHandler(updateFbPixel));

	return adminRouter;
};
