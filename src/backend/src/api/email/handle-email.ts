import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
	const body = JSON.parse(req.body.toString("utf8"));

	const mailSender = req.scope.resolve("mailSenderService");

	console.log({ body });

	const url = new URL(body.host ?? "");
	url.pathname += `/${body.cartId}`;

	console.log({ url: url.toString() });

	var result = await mailSender.sendMail(body.email, body.cartId);

	res.status(200).json({ status: "ok", result });
};
