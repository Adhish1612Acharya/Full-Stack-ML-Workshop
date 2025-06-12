import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    filters: [
      {
        type: String,
        trim: true,
      },
    ],
    user: {
      fullName: {
        type: String,
        required: true,
      },
      profileImage: {
        type: String,
      },
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
