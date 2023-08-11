import { Router } from "express";
import hooks from "./hooks";

export default (rootDirectory: string): Router | Router[] => {
	// add your custom routes here
	const router = Router();

	hooks(router);

	return router;
};
