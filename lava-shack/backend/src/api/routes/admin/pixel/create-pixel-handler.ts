import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	const fbPixelService = req.scope.resolve("trackingPixelService");

	const pixel = await fbPixelService.create(req.body);

	res.json({ pixel });
};
