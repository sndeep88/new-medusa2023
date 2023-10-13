import { Request, Response } from "express";
import PageService from "services/page";

export default async (req: Request, res: Response) => {
	const pageService = req.scope.resolve("pageService") as PageService;

	const { id } = req.params;

	const { title, content, status, slug } = req.body;

	const page = await pageService.update(id, { title, content, status, slug });

	res.status(200).json({ page });
};
