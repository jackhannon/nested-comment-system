import mongoose from "mongoose";


const PostSchema = new mongoose.Schema ({
  type: Object,
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true
  },
  comments: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Comment"
  }]
})


const UserSchema = new mongoose.Schema ({
  type: Object,
  name: {
    type: String,
    required: true
  },
  comments: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Comment"
  }]
})


const CommentSchema = new mongoose.Schema ({
  type: Object,
  user: {
    type: Object,
    _id: String,
    user: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  parentId: {
   type: mongoose.SchemaTypes.ObjectId,
   ref: "Comment",
  },

  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: Date
})


const LikeSchema = new mongoose.Schema ({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },

  comment: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Comment"
  }
})
const Person = mongoose.model("User", UserSchema);
const Comment = mongoose.model("Comment", CommentSchema);
const Post = mongoose.model("Post", PostSchema)
const Like = mongoose.model("Like", LikeSchema)

export {Person, Comment, Post, Like}