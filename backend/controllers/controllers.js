import { ObjectId } from "mongodb"
import { Person, Post, Comment } from "../models/schema.js"

const getPosts = async(req, res, next) => {
  try {
    let posts = await Post.find({}).select("title")
    res.status(200).json(posts)
  } catch (error) {
    error.message = "Failed to get posts"
    next(error)
  }
}

const getPost = async(req, res, next) => {
  const { id } = req.params
  try {
    const post = await Post.findById(id).select("title body")
    .populate({
      path: "comments", 
      select: "createdAt parentId body user",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "user",
        select: "name",
      },
    }).populate({
      path: "user",
      select: "name"
    })
    
    res.status(200).json(post)
  } catch (error) {
    error.message = "Failed to get post"
    next(error)
  }
}


const postComment = async (req, res, next) => {
  const { id } = req.params
  const { body, parentId, userId, username } = req.body
  try {
    if (!body) {
      return res.status(400).send("A message is required")
    } 
    const post = await Post.findById(id)

    const comment = await Comment.create({
      body: body,
      parentId: parentId,
      user: {
        id: userId,
        user: username
      },
      createdAt: Date.now()
    });
    post.comments.push(comment._id)
    post.save()
    res.status(200).json(comment)
  } catch (error) {
   
    error.message = "Failed to create comment"
    next(error)
  }
}

export {getPosts, getPost, postComment}