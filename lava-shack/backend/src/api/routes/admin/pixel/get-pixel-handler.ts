import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	console.log(req.scope.registrations);
	const fbPixelService = req.scope.resolve("trackingPixelService");

	const pixels = await fbPixelService.getAll();

	res.json({ pixels });
};
