import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	const pixelId = req.params.id;

	const fbPixelSer = req.scope.resolve("trackingPixelService");

	const pixel = await fbPixelSer.getById(pixelId);

	res.status(200).json({ pixel });
};
