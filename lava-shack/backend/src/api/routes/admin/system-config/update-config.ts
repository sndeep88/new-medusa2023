import { Request, Response } from "express";
import SystemConfigService from "../../../../services/system-config";
import * as _ from "lodash";

export default async (req: Request, res: Response) => {
	const systemConfigService = req.scope.resolve<SystemConfigService>(
		"systemConfigService"
	);

	const body = req.body;

	for (let cfg of body.configs) {
		await systemConfigService.update(cfg);
	}

	res.status(200).json({ status: "ok" });
};
