import { createContext, useMemo, useContext, useState, useEffect } from "react";
import { useAsync } from "../hooks/useAsync";
import { getPost } from "../utils/posts";
import { useParams } from 'react-router-dom'
import { Comment, Post } from "../interfaces";


interface ContextProviderProps {
  children: React.ReactNode;
}

interface ContextTypes {
  data: Post,
  rootComments: Comment[],
  getReplies: (parentId: string) => Comment[],
  createLocalComment: (comment: Comment) => void,
  updateLocalComment: (id: string, body: string) => void,
  deleteLocalComment: (id: string) => void
}

const PostContext = createContext({} as ContextTypes);

const usePost = () => {
  return useContext(PostContext)
}

const PostProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const { id } = useParams()
  const {loading, error, data} = useAsync(() => getPost(id), [id])
  //never do that shit again where you pass id into the call back
  const [comments, setComments] = useState<Comment[]>([])
  console.log(comments)
  const commentsByParentId = useMemo(() => {
    const group: { [key: string]: Comment[] } = {}
    group["root"] = []
    comments.forEach((comment: Comment) => {
      
      if (comment.parentId && !group[comment.parentId]) {
        group[comment.parentId] = []
      } 
      if (comment?.parentId) {
        group[comment.parentId].push(comment)
      } else {
        group["root"].push(comment)
      }
    })
    return group
  }, [comments])

  useEffect(() => {
    if (data?.comments) {
      setComments(data?.comments)
    }
  }, [data?.comments])

  const getReplies = (parentId: string) => {
    return commentsByParentId[parentId]
  }

  function createLocalComment(comment: Comment) {
    console.log(comment)
    setComments(prevComments => {
      return [comment, ...prevComments]
    })
  }

  function updateLocalComment(id: string, body: string) {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment._id === id) {
          return { ...comment, body };
        }
        return comment;
      });
    });
  }

  function deleteLocalComment(id: string) {
    setComments(prevComments => {
      return prevComments.filter(comment => comment._id !== id)
    })
  }

  function toggleLocalCommentLike(id: string, body: string) {
    
  }


  return (
    <PostContext.Provider value={{
    data,
    getReplies,
    rootComments: commentsByParentId["root"],
    updateLocalComment, 
    createLocalComment,
    deleteLocalComment, 
    toggleLocalCommentLike
    }}>
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1 className="error-msg">{error.message}</h1> 
      ) : (
        <>
          {children}
        </>
      )}
    </PostContext.Provider>
  );
}

export { PostProvider, usePost }