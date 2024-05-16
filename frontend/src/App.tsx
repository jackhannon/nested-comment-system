import React, { useEffect } from 'react'
import { Routes, Route, useNavigate} from 'react-router-dom'
import Posts from './components/Posts'
import Post from './components/Post'
import { PostProvider } from './contexts/PostContext'
import Header from './components/Header'

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/posts/6645654dc0565c11d91393f0')
  }, [navigate])
  return (
  <>
    <Header />
    <div className='body-container'>
    <Routes>
      <Route path="/" element={<Posts />}/>
      <Route path="/posts/:id" element={<PostProvider>
        <Post />
      </PostProvider>} />
    </Routes>
    </div>
  </>
  )
}

export default App
