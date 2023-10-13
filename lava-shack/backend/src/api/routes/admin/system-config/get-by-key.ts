import { Request, Response } from "express";
import SystemConfigService from "../../../../services/system-config";

export default async (req: Request, res: Response) => {
	const systemConfigService = req.scope.resolve<SystemConfigService>(
		"systemConfigService"
	);

	const key = req.params.key;

	const config = await systemConfigService.findByKey(key);

	res.status(200).json({ configs: config });
};
