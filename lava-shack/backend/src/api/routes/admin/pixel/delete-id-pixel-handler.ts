import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	const pixelId = req.params.id;

	const fbPixelSer = req.scope.resolve("trackingPixelService");
	await fbPixelSer.delete(pixelId);

	res.status(200).json({ id: pixelId });
};
