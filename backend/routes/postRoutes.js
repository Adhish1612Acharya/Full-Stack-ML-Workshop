import express from "express";
import {
  createMultiplePosts,
  getAllPosts,
  searchPosts,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/multiple", createMultiplePosts);
router.get("/", getAllPosts);
router.get("/search", searchPosts);

export default router;
