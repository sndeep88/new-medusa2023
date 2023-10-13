import { wrapHandler } from "@medusajs/medusa";
import { Router } from "express";
import * as multer from "multer";

const array_of_allowed_file_types = [
	"image/png",
	"image/jpeg",
	"image/jpg",
	"image/gif",
];

const router = Router();
const upload = multer({
	dest: "uploads/",
	fileFilter: (req, file, cb) => {
		if (!array_of_allowed_file_types.includes(file.mimetype)) {
			return cb(new Error("Only image files allowed!"));
		}
		cb(null, true);
	},
});

export default (storeRouter: Router) => {
	storeRouter.use("/upload", router);

	router.post(
		"/",
		upload.array("files"),
		wrapHandler(require("./upload").default)
	);
};
