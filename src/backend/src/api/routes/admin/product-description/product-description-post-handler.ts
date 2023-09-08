import { Request, Response } from "express";

export default async (req: Request, res: Response): Promise<void> => {

	const body = req.body
	const productId = req.params.productId;

	const productService = req.scope.resolve("productDescriptionService");

	const updated = await productService.updateProductDescription(
		productId,
		body.content
	);

	res.json({ content: updated.content });
};
