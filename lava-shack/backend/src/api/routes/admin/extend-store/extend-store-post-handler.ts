import { Request, Response } from "express";
import ExtendStoreService from "services/extend-store";

export default async (req: Request, res: Response) => {
	const extendStoreSer =
		req.scope.resolve<ExtendStoreService>("extendStoreService");

	const updated = await extendStoreSer.update(req.body);

	res.status(200).json({ extendStore: updated });
};
