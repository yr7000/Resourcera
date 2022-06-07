// files in the routes folder will have just route requests, logic is maintained in controllers
import express from "express";
import auth from "../middleware/auth.js";
import { getPostsBySearch, getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

// import route handlers
const router = express.Router();

router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
