import { wrapHandler } from "@medusajs/medusa";
import { Request, Response, Router } from "express";
import TrackingPixelService from "services/tracking-pixel";

const router = Router();

export default (storeRouter: Router) => {
	storeRouter.use("/pixels", router);

	router.get("/", wrapHandler(getPixel));

	return storeRouter;
};

async function getPixel(req: Request, res: Response) {
	const fbPixelSer = req.scope.resolve<TrackingPixelService>(
		"trackingPixelService"
	);

	const pixels = await fbPixelSer.retrieve();

	res.status(200).json({ pixels });
}
