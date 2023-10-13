import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	const extendStoreService = req.scope.resolve("extendStoreService");

	const extendStore = await extendStoreService.get();

	res.status(200).json({ extendStore });
};
