import { Request, Response } from "express";
import SystemConfigService from "../../../../services/system-config";

export default async (req: Request, res: Response) => {
	const systemConfigService = req.scope.resolve<SystemConfigService>(
		"systemConfigService"
	);

	const configs = await systemConfigService.list();

	res.status(200).json({ configs });
};
