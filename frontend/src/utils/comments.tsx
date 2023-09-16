import makeRequest from "./makeRequests";

interface CreateCommentInterface {
  postId: string;
  body: string;
  parentId: string | null;
  userId: string;
  username: string;
  token: string;
}

export function createComment({ postId, body, parentId = null, userId, username, token }: CreateCommentInterface) {
  const requestData = {
    body,
    parentId,
    userId,
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