import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	const pageService = req.scope.resolve("pageService");

	const id = req.params.id;

	await pageService.delete(id);

	res.status(200).json({ id });
};
