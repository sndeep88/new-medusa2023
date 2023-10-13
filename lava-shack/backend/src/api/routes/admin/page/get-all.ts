import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	const pageService = req.scope.resolve("pageService");

	const pages = await pageService.getAll();

	res.json({ pages });
};
