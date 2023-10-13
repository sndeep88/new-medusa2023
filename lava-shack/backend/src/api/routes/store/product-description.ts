import { wrapHandler } from "@medusajs/medusa";
import { Request, Response, Router } from "express";
import ProductDescriptionRepository from "repositories/product-description";

const router = Router();

export default (storeRouter: Router) => {
	storeRouter.use("/product/description", router);

	router.get("/:handle", wrapHandler(getProductDescriptionHandler));

	return storeRouter;
};

async function getProductDescriptionHandler(req: Request, res: Response) {
	const productHandle = req.params.handle;

	const pdRepo = req.scope.resolve("productDescriptionService");

	const desc = await pdRepo.findByProductHandle(productHandle);

	if (!desc) {
		res.status(404).json({ message: "Not found" });
		return;
	}

	res.status(200).json(desc);
}
