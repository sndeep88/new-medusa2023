import { Request, Response } from "express";
import TemplateService from "services/template";

export default async (req: Request, res: Response) => {
	const { id } = req.params;

	const templateService = req.scope.resolve<TemplateService>("templateService");

	const template = await templateService.restoreDefault(id);

	res.json({ template });
};
