import React, { useState } from 'react'
import { Comment } from '../interfaces'
// import IconButton from './IconButton'
// import { faHeart, faReply } from '@fortawesome/free-solid-svg-icons'
// import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit'
// import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { usePost } from '../contexts/PostContext'
import Comments from './Comments'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short"
 })

interface Props {
  comment: Comment
}

const Comment: React.FC<Props> = ({comment}) => {
  const {getReplies} = usePost()
  const childComponents = getReplies(comment._id)
  const [showReplies, setShowReplies] = useState<boolean>(false)

  const createdAt = new Date(comment.createdAt);

  return (
    <>
      <div className='comment'>
        <div className='header'>
          <span className='name'>{comment.user.name}</span>
          <span className='date'>{dateFormatter.format(createdAt)}</span>
        </div>
        <div className='message'>{comment.body}</div>
        <div className='footer'>
          {/* <IconButton Icon={faHeart} aria-label="Like" />
          <IconButton Icon={faReply} aria-label="Reply" /> 
          <IconButton Icon={faEdit} aria-label="Edit" />
          <IconButton Icon={faTrash} aria-label="Delete" color="danger" /> */}

        </div>
      </div>
      {childComponents?.length > 0 ? (
        <>
          <div className={`nested-comment-stack ${!showReplies ? "hide": null}`}>
            <button className='collapse-line' 
            aria-label="hide Replies" 
            onClick={() => setShowReplies(false)}
            />
            <div className='nested-comments'>
              <Comments comments={childComponents} />
            </div>
          </div>
          <button className={`btn mt-1 ${showReplies ? "hide" : null}`}
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