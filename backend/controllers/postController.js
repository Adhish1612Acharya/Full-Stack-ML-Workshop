import { config as dotEnvConfig } from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotEnvConfig();
}

import Post from "../models/Post.js";
import ExpressError from "../utils/expressError.js";
import { transformPost } from "../utils/postTransformer.js";
import axios from "axios";

// Function to call the ML model API
const getMLModelResponse = async (posts, query) => {
  try {
    const response = await axios.post(process.env.ML_MODEL_URL, {
      ApiKey: process.env.ML_API_KEY,
      prompt: query,
      posts: posts.map((post) => ({
        postId: post.id,
        title: post.title,
        description: post.description,
        filters: post.filters,
      })),
    });

    // Assuming the model returns an array of post IDs
    return response.data.results;
  } catch (error) {
    console.error("ML Model API Error:", error);
    throw new ExpressError(500, "Error getting response from ML model");
  }
};

export const createMultiplePosts = async (req, res, next) => {
  const { body } = req;

  if (!body || !Array.isArray(body) || body.length === 0) {
    throw new ExpressError(
      400,
      "Invalid request body. Expected an array of posts."
    );
  }

//   await Post.deleteMany({});

  const posts = await Post.insertMany(body);
  res.status(201).json({
    success: true,
    data: posts,
  });
};

export const getAllPosts = async (req, res, next) => {
  const posts = await Post.find();

  if (!posts) {
    throw new ExpressError(500, "Error fetching posts from database");
  }

  res.status(200).json({
    success: true,
    data: posts,
  });
};

export const searchPosts = async (req, res, next) => {
  const { prompt } = req.query;

  if (!prompt) {
    throw new ExpressError(400, "Search prompt is required");
  }

  // 1. Get all posts
  const allPosts = await Post.find();

  if (!allPosts) {
    throw new ExpressError(500, "Error fetching posts from database");
  }

  // 2. Transform posts using the utility function
  const transformedPosts = allPosts.map(transformPost);

  // 3. Get relevant post IDs from ML model
  const relevantPostIds = await getMLModelResponse(transformedPosts, prompt);

  console.log("Relevant Post IDs:", relevantPostIds);

  if (!relevantPostIds || relevantPostIds.length === 0) {
    throw new ExpressError(404, "No relevant posts found for the given prompt");
  }

  // 4. Fetch the full post details for the relevant IDs
  const relevantPosts = await Post.find({
    _id: { $in: relevantPostIds },
  });

  if (!relevantPosts) {
    throw new ExpressError(500, "Error fetching relevant posts from database");
  }

  res.status(200).json({
    success: true,
    data: relevantPosts,
  });
};
