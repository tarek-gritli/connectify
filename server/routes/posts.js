import express from "express";
import {
  getFeed,
  getUserPosts,
  likePost,
  unlikePost,
  commentPost,
  deletePost,
  createPost,
} from "../controllers/posts.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", verifyToken, getFeed);
router.get("/user/:id", verifyToken, getUserPosts);

router.post("/create", verifyToken, createPost);

router.patch("/like/:postId", verifyToken, likePost);
router.patch("/unlike/:postId", verifyToken, unlikePost);
router.patch("/comment/:postId", verifyToken, commentPost);

router.delete("/delete/:postId", verifyToken, deletePost);

export default router;
