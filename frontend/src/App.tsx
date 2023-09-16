import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Posts from './components/Posts'
import Post from './components/Post'
import { PostProvider } from './contexts/PostContext'
import Header from './components/Header'

function App() {


  return (
  <>
    <Header />
    <div className='body-container'>
    <Routes>
      <Route path="/" element={<Posts />}/>
      <Route path="/posts/:id" element={<PostProvider>
        <Post />
      </PostProvider>} />
      <Route path="/posts/:id/comments" element={<PostProvider>
        <Post />
      </PostProvider>} />
    </Routes>
    </div>
  </>
  )
}

export default App
