import { Request, Response } from "express";
import { template } from "lodash";

export default async (req: Request, res: Response) => {
	const templateService = req.scope.resolve("templateService");

	const id = req.params.id;

	const template = await templateService.getById(id);

	res.json({ template });
};
