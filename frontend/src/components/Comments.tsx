import React from 'react'
import Comment from './Comment'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  comments: Comment[]
  loading?: boolean
}

const Comments:React.FC<Props> = ({comments}) => {
  
  const {user} = useAuth0()
  return comments.map(comment => (
    <div key={comment._id} className="comment-stack">
      <Comment 
        comment={comment} 
        isOwnComment={comment.user.id === user?.sub} 
        didLike={comment.likes.includes(user?.sub || "undefined")}
        numberOfLikes={comment.likes.length}
      />
    </div>

  ))
}

export default Comments