import React from 'react'
import Comment from './Comment'

interface Props {
  comments: Comment[]
  loading?: boolean
}

const Comments:React.FC<Props> = ({comments}) => {
  
  return comments.map(comment => (
    <Comment key={comment._id} comment={comment}/>
  ))
}

export default Comments