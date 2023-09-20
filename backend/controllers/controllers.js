import { Post, Comment } from "../models/schema.js"

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
      select: "createdAt parentId body user likes",
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
  const { body, parentId, currentUserId, username } = req.body
  try {
    if (!body) {
      return res.status(400).send("A message is required")
    } 
    const post = await Post.findById(id)

    const comment = await Comment.create({
      body: body,
      parentId: parentId,
      user: {
        id: currentUserId,
        name: username
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



const updateComment = async (req, res, next) => {
  const {commentId} = req.params
  const { body, currentUserId, commentUserId } = req.body
  try {
    if (commentUserId !== currentUserId) {
      return res.status(401).send("The comment must be your own")
    }
    if (!body) {
      return res.status(400).send("A message is required")
    } 

    const comment = await Comment.findByIdAndUpdate(commentId, {
      body: body,
      updatedAt: Date.now()
    });
    res.status(200).json(comment)
  } catch (error) {
    error.message = "Failed to update comment"
    next(error)
  }
}



const deleteComment = async (req, res, next) => {
  const {postId, commentId} = req.params
  const { currentUserId, commentUserId } = req.body
  try {
    if (commentUserId !== currentUserId) {
      return res.status(401).send("The comment must be your own")
    }

    const post = await Post.findById(postId)

    post.comments.filter(comment => comment._id !== commentId)
    post.save()
    const comment = await Comment.findByIdAndDelete(commentId)
    res.status(200).json(commentId)
  } catch (error) {
    error.message = "Failed to delete comment"
    next(error)
  }
}


const toggleLikeComment = async (req, res, next) => {
  const { commentId } = req.params
  const { currentUserId } = req.body
  try {
    const comment = await Comment.findById(commentId)
    if (comment.likes.includes(currentUserId)) {
      comment.likes.splice(comment.likes.indexOf(currentUserId), 1)
    } else {
      comment.likes = [...comment.likes, currentUserId]
    }
    comment.save()
    res.sendStatus(200)
  } catch (error) {
    error.message = "Failed to update comment"
    next(error)
  }
}

export {getPosts, getPost, postComment, updateComment, deleteComment, toggleLikeComment}