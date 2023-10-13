import { wrapHandler } from "@medusajs/medusa";
import { Request, Response, Router } from "express";

const router = Router();

export default (storeRouter: Router) => {
	storeRouter.use("/extend-store", router);

	router.get("/", wrapHandler(getExtendStore));

	return storeRouter;
};

async function getExtendStore(req: Request, res: Response) {
	const extendStoreSer = req.scope.resolve("extendStoreService");

	const extendStore = await extendStoreSer.retrieve();

	res.status(200).json({ extendStore });
}
