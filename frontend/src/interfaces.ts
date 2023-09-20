interface User {
  id?: string,
  name?: string
}

interface Post {
  _id: string,
  user?: User,
  title: string,
  body?: string,
  createdAt?: Date
  comments?: [],
}

interface Comment {
  _id: string,
  body: string,
  postId: string
  createdAt: Date | string
  user: User
  likes: string[]
  parentId?: string
}

export type { Post, Comment }