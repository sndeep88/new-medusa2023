import { Request, Response } from "express";
import TemplateService from "../../../../services/template";

export default async (req: Request, res: Response) => {
	const templateService = req.scope.resolve<TemplateService>("templateService");

	const id = req.params.id;

	const template = await templateService.update(id, req.body);

	res.json({ template });
};
