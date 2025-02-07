import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxLength: 200,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.models["Posts"] || mongoose.model("Posts", PostSchema); //mongoDB.collections.name = Posts

export default Posts;