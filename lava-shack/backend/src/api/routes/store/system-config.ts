import { wrapHandler } from "@medusajs/medusa";
import { Request, Response, Router } from "express";
import SystemConfigService from "services/system-config";

const router = Router();

export default (storeRouter: Router) => {
	storeRouter.use("/system-config", router);

	router.get("/", wrapHandler(getConfig));
};

async function getConfig(req: Request, res: Response) {
	const provider = req.query.provider as string;
	const type = req.query.type as string;

	const systemConfigService = req.scope.resolve<SystemConfigService>(
		"systemConfigService"
	);

	const configs = await systemConfigService.listByProvider(provider, type);

	res.json({ configs });
}
