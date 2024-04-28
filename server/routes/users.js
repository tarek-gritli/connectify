import express from "express";
import {
  getUser,
  getUserFriends,
  removeFriend,
  addFriend,
  deleteAccount,
} from "../controllers/users.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

router.patch("/:id/add/:friendId", verifyToken, addFriend);
router.patch("/:id/delete/:friendId", verifyToken, removeFriend);

router.delete("/delete/:id", verifyToken, deleteAccount);

export default router;
