import e from "express";
import Posts from "../models/Post.js";

const PostsRouter = e.Router();

function asyncHandler(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch(e) {
      if(e.name === "CastError") res.status(404).send({ message: "Connot find given id" });
      else if(e.name === "ValidationError") res.status(400).send({ message: e.message });
      else res.status(500).send({ message: e.message });
    }
  }
}

PostsRouter.route('/')
  .get(asyncHandler(async (req, res) => {
    const count = Number(req.query["limit"]) || 0;
    const post = await Posts.find().sort({ createdAt: 'desc' }).limit(count);
    res.status(200).send(post);
  }))
  .post(asyncHandler(async (req, res) => {
    const newPost = await Posts.create(req.body);
  
    res.status(201).send(newPost);
  }));

export default PostsRouter; 