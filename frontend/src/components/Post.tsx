import React from 'react'
import { usePost } from '../contexts/PostContext'
import Comments from './Comments'
import CommentForm from './CommentForm'
import { useAsyncFn } from '../hooks/useAsync'
import { createComment } from '../utils/comments'
import { useAuth0 } from '@auth0/auth0-react'

const Post = () => {
  const {data: post, rootComments, createLocalComment } = usePost()
  const {loading, error, execute: createCommentFn} = useAsyncFn(createComment)
  const { getAccessTokenSilently, user } = useAuth0()

  const handleCommentCreate = async (body: string) => {
    const token = await getAccessTokenSilently()
    const currentUserId = user?.sub
    const username = user?.given_name
    return createCommentFn({ postId: post._id, body, currentUserId, username, token })
    .then(comment => createLocalComment(comment))
  }



  return (
    <>
      <h1>{post.title}</h1>
      <article>{post.body}</article>
      <h3 className='comments-title'>Comments</h3>
      <section>
        <CommentForm 
          autoFocus
          loading={loading} 
          error={error} 
          onSubmit={handleCommentCreate} 
        />
        {rootComments != null && rootComments.length > 0 ? 
          <div className='mt-4'>
            <Comments comments={rootComments} />
          </div>
        : 
          <p>No comments yet!</p>
        }
      </section>
    </>
  )
}

export default Post