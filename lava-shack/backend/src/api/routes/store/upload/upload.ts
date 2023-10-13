import { IFileService } from "@medusajs/medusa";
import { Request, Response } from "express";
import * as fs from "fs";
import { isArray } from "lodash";

export default async (req: Request, res: Response) => {
	const fileService: IFileService = req.scope.resolve("fileService");

	const files = isArray(req.files) ? req.files : req.files["files"];

	const result = await Promise.all(
		files.map(async (f) => {
			return fileService.upload(f).then((result) => {
				fs.unlinkSync(f.path);
				return result;
			});
		})
	);

	res.status(200).json({ uploads: result });
};
