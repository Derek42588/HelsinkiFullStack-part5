/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState('error')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


useEffect(() => {
  blogService
  .getAll()
  .then(initialBlogs => {
    setBlogs(initialBlogs)
  })
}, [])

useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
  }
}, [])

const handleLogout = (event) => {
  event.preventDefault()
  setUser(null)
  window.localStorage.clear()
}

const handleLogin = async (event) => {
  event.preventDefault()
  try {
    const user = await loginService.login({
      username, password
    })

    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
    setMessageType('success')
    setErrorMessage('Logged in successfully!')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  } catch (exception) {
    setMessageType('error')
    setErrorMessage('Wrong credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}
const blogsList = () => blogs.map(blog => 
  <Blog
    key={blog.id}
    blog={blog}
  />
)

const loginForm = () => (
  <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>      
)

const addBlog = (blogObject) => {

  blogService
  .create(blogObject)
  .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setMessageType('success')
      setErrorMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
        setMessageType('error')
      }, 5000)
  })

}

return ( 
  <div>
    <h1>Blogs</h1>

    <Notification message = {errorMessage} type = {messageType} />

    <h2>Login</h2>
    {user === null ? 
    loginForm():
    <div>
    <p>{user.name} logged in</p>
    <button onClick = {handleLogout}>logout</button>
    <BlogForm addBlog = {addBlog} />
    {blogsList()}
    </div>
    }

    <Footer />
  </div>
)
}
export default App;
