import { Request, Response } from "express";

export default async (req: Request, res: Response): Promise<void> => {
	console.log(req.params);
	const productId = req.params.productId;

	const productService = req.scope.resolve("productDescriptionService");

	const prodDesc = await productService.getProductDescription(productId);

	res.json({ content: prodDesc.content });
};
