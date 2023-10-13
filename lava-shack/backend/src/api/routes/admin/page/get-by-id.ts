import { Request, Response } from "express";
import PageService from "services/page";

export default async (req: Request, res: Response) => {
	const pageService = req.scope.resolve("pageService") as PageService;

	const id = req.params.id;

	console.log({ id });

	const page = await pageService.getbyId(id);

	res.json({ page });
};
