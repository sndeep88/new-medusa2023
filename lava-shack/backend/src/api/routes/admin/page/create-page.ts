import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	const pageService = req.scope.resolve("pageService");

	const { title, content } = req.body;

	const page = await pageService.create({ title, content });

	res.status(201).json({ page });
};
