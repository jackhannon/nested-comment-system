import { Link } from "react-router-dom"
import { useAsync } from "../hooks/useAsync"
import { getPosts } from "../utils/posts"
import { Post } from "../interfaces"

const Posts = () => {
  const { loading, error, data } = useAsync(getPosts)

  if (loading) return <h1>Loading</h1>
  if (error) return <h1 className="error-msg">{error.message}</h1>

  return data.map((post: Post) => {
    return (
      <h1 key={post._id}>
        <Link to={`/posts/${post._id}`}>{post.title}</Link>
      </h1>
    )
  })
}

export default Posts