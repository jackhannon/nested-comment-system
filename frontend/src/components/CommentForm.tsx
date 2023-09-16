import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  initialValue?: string;
  loading: boolean;
  error: Error;
  onSubmit: (body: string) => Promise<void>
  autoFocus: boolean
}

const CommentForm: React.FC<Props> = ({ 
  initialValue = "", 
  loading,
  error, 
  onSubmit, 
  autoFocus = false 
}) => {
  const [comment, setComment] = useState(initialValue)

  const { isAuthenticated, loginWithPopup } = useAuth0()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(comment).then(()=>setComment(""))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='comment-form-row'>
        <textarea 
          value={comment} 
          className='message-input' 
          onChange={(e)=>setComment(e.target.value)}
          autoFocus={autoFocus}
        />
        {isAuthenticated ? (
        <button className='btn' disabled={loading} type='submit'>
          {loading ? "Loading" : "Post"}
        </button>
        ) : (
        <button className='btn' onClick={() => loginWithPopup()} type='button'>
          Login to comment
        </button>
        )}

      </div>
      <div className='error-msg'>{error?.message}</div>
    </form>
  )
}

export default CommentForm