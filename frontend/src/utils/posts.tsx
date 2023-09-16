import makeRequest from "./makeRequests";

export function getPosts() {
  return makeRequest('/posts')
}

export function getPost(id: unknown) {
  return makeRequest(`/posts/${id}`)
}

