import * as express from "express";
import { upload } from "../../middleware/image-upload/index.js";
import postsController from "./posts-controller.js";

const router = express.Router();

router.get("/", postsController.getAllPosts);

router.post("/", upload.single("image"), postsController.createPost);

router.delete("/:id", postsController.deletePost);

export default router;
