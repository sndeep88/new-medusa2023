import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	const templateService = req.scope.resolve("templateService");

	const { type } = req.query as { type?: string };

	let templates = [];

	if (type) {
		templates = await templateService.getByType(type);
	} else {
		templates = await templateService.getAll();
	}

	res.json({ templates });
};
