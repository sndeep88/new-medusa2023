import { wrapHandler } from "@medusajs/medusa";
import { Request, Response, Router } from "express";

const router = Router();

export default (storeRouter: Router) => {
	storeRouter.use("/pages", router);

	router.get("/", wrapHandler(getPages));
	router.get("/:slug", wrapHandler(getPageBySlug));

	return storeRouter;
};

async function getPages(req: Request, res: Response) {
	const pageService = req.scope.resolve("pageService");

	const query = req.query as { tag?: string; select?: string };
	// console.log({ query });
	const pages = await pageService.retrieve(query.tag, query.select.split(","));

	res.status(200).json({ pages });
}

async function getPageBySlug(req: Request, res: Response) {
	const slug = req.params.slug;

	const pageService = req.scope.resolve("pageService");

	const page = await pageService.getBySlug(slug);

	if (!page) {
		res.status(404).json({ message: "Page not found" });
		return;
	}

	res.status(200).json({ page });
}
