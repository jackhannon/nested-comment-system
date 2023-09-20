import makeRequest from "./makeRequests";
import { utilInterface} from "./utilInterfaces";


export function createComment({ postId, body, parentId = null, currentUserId, username, token }:utilInterface) {
  const requestData = {
    body,
    parentId,
    currentUserId,
    username
  };

  return makeRequest(`/posts/${postId}/comments`, {
    method: "POST",
    data: requestData,
    headers: {
      authorization: `Bearer ${token}`
    }
  });
}



export function updateComment({ commentId, body, commentUserId, currentUserId, token }: utilInterface) {
  const requestData = {
    body,
    commentUserId,
    currentUserId
  };

  return makeRequest(`/posts/${commentId}`, {
    method: "PATCH",
    data: requestData,
    headers: {
      authorization: `Bearer ${token}`
    }
  });
}


export function deleteComment({ postId, commentId, commentUserId, currentUserId, token }: utilInterface) {
  const requestData = {
    commentUserId,
    currentUserId
  };

  return makeRequest(`/posts/${postId}/${commentId}`, {
    method: "DELETE",
    data: requestData,
    headers: {
      authorization: `Bearer ${token}`
    }
  });
}


export function toggleCommentLike({ commentId, currentUserId, token }: utilInterface) {
  console.log(currentUserId)
  const requestData = {
    currentUserId
  };

  return makeRequest(`/posts/like/${commentId}`, {
    method: "PATCH",
    data: requestData,
    headers: {
      authorization: `Bearer ${token}`
    }
  });
}

