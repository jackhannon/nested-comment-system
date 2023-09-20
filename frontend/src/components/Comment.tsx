import React, { useState } from 'react'
import { Comment } from '../interfaces'
import IconButton from './IconButton'
import { faHeart, faReply } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { usePost } from '../contexts/PostContext'
import Comments from './Comments'
import { useAuth0 } from '@auth0/auth0-react'
import CommentForm from './CommentForm'
import { createComment, deleteComment, updateComment, toggleCommentLike} from '../utils/comments'
import { useAsyncFn } from '../hooks/useAsync'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short"
})

interface Props {
  comment: Comment
  isOwnComment: boolean
  didLike: boolean
  numberOfLikes: number
}

const Comment: React.FC<Props> = ({comment, isOwnComment, didLike, numberOfLikes}) => {
  const { isAuthenticated, loginWithPopup, getAccessTokenSilently, user} = useAuth0()

  const {getReplies, createLocalComment, updateLocalComment, deleteLocalComment, toggleLocalCommentLike, data: post} = usePost()
  const childComments = getReplies(comment._id)
  const [showReplies, setShowReplies] = useState<boolean>(false)
  const [isReplying, setIsReplying] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const createCommentState = useAsyncFn(createComment)
  const updateCommentState = useAsyncFn(updateComment)
  const deleteCommentState = useAsyncFn(deleteComment)
  const likeCommentState = useAsyncFn(toggleCommentLike)


  const createdAt = new Date(comment.createdAt);
  
  const onCommentReply = async(body: string) => {
    const token = await getAccessTokenSilently()
    const currentUserId = user?.sub || ""
    const username = user?.given_name
    return createCommentState.execute({ postId: post._id, body, parentId: comment._id, currentUserId, username, token })
    .then(comment => {
      
      setIsReplying(false)
      createLocalComment(comment)
    }
    )
  }

  const onCommentUpdate = async(body: string) => {
    const token = await getAccessTokenSilently()
    const currentUserId = user?.sub || ""
    const commentUserId = comment.user.id
    return updateCommentState.execute({ commentId: comment._id, body, commentUserId, currentUserId, token })
    .then(comment => {
      setIsEditing(false)
      updateLocalComment(comment._id, body)
    }
    )
  }


  const onCommentDelete = async() => {
    const token = await getAccessTokenSilently()
    const currentUserId = user?.sub || ""
    const commentUserId = comment.user.id
    return deleteCommentState.execute({ postId: post._id, commentId: comment._id, commentUserId, currentUserId, token })
    .then(commentId =>  { 
      deleteLocalComment(commentId)
    })
  }

  const onCommentLike= async() => {
    const token = await getAccessTokenSilently()
    const currentUserId = user?.sub || ""

    return likeCommentState.execute({ currentUserId, commentId: comment._id, token })
    .then(() => { 
       toggleLocalCommentLike(comment._id, currentUserId)
    })
  }
  return (
    <>
      <div className='comment'>
        <div className='header'>
          <span className='name'>{comment.user.name}</span>
          <span className='date'>{dateFormatter.format(createdAt)}</span>
        </div>
        {isEditing ? (
          <CommentForm autoFocus initialValue={comment.body} onSubmit={onCommentUpdate}
          loading={updateCommentState.loading} error={updateCommentState.error} />
        ) : null}
        <div className='message'>{comment.body}</div>
        <div className='footer'>
          <IconButton Icon={faHeart} 
            aria-label={didLike ? "Unlike" : "Like"}
            color={didLike ? "red" : ""}
            onClick={isAuthenticated ? () => onCommentLike() : () => loginWithPopup()} 
            disabled={likeCommentState.loading}
            children={numberOfLikes}
          />
          <IconButton Icon={faReply} 
            aria-label={isReplying ? "Cancel Reply" : "Reply"}
            onClick={isAuthenticated ? () => setIsReplying(!isReplying) : () => loginWithPopup()} 
            disabled={createCommentState.loading}
          /> 
          {isOwnComment ? (
            <IconButton Icon={faEdit}
            aria-label={isEditing ? "Cancel Edit" : "Edit"}
            onClick={() => setIsEditing(!isEditing)} 
            disabled={updateCommentState.loading}
            />
          ): null}
          {isOwnComment ? (
            <IconButton Icon={faTrash} 
            aria-label="Delete" 
            onClick={() => onCommentDelete()}
            disabled={deleteCommentState.loading}
            color="danger" 
          />
          ): null}
        </div>
      </div>
      {isReplying ? (
        <div className='mt-1 ml-3'>
          <CommentForm 
            autoFocus 
            onSubmit={onCommentReply} 
            loading={createCommentState.loading}
            error={createCommentState.error}
          />
        </div>
      ) : null}
      {childComments?.length > 0 ? (
        <>
          <div className={`nested-comment-stack ${!showReplies ? "hide" : ""}`}>
            <button 
              className='collapse-line' 
              aria-label="hide Replies" 
              onClick={() => setShowReplies(false)}
            />
            <div className='nested-comments'>
              <Comments comments={childComments} />
            </div>
          </div>
          <button className={`btn mt-1 ${showReplies ? "hide" : ""}`}
          onClick={() => setShowReplies(true)}
          >
            Show Replies
          </button>
        </>
      ) : null}
   </>
  )
}

export default Comment