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
    const page = Number(req.query["page"]) || 0
    const limit = Number(req.query["limit"]) || 3;

    const totalCount = await Posts.countDocuments();
    const offset = page * limit;
    const hasMore = offset + limit < totalCount;

    const posts = await Posts.find().sort({ createdAt: 'desc' }).skip(offset).limit(limit);
    res.status(200).json({ 
      totalCount, page, hasMore, posts });
  }))
  .post(asyncHandler(async (req, res) => {
    const newPost = await Posts.create(req.body);
  
    res.status(201).send(newPost);
  }));

export default PostsRouter; 