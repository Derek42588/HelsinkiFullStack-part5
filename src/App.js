/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState('error')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        sortByLikes(initialBlogs)
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

  const sortByLikes = (blogs) => {
    blogs.sort((a, b) => (b.likes) - (a.likes))
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
      addLike = {addLike}
      user = {user}
      deleteBlog = {deleteBlog}
    />

  )

  const addLike = (blog) => {
    const blogObject = {
      title: blog.title,
      url: blog.url,
      author: blog.author,
      likes: (blog.likes +1 ),
      user: blog.user.id
    }

    console.log(blogObject)
    blogService
      .update(blog.id, blogObject)
      .then(
        blogService
          .getAll()
          .then(updatedBlogs => {
            sortByLikes(updatedBlogs)
            setBlogs(updatedBlogs)
          })
      )


  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style = {hideWhenVisible}>
          <button onClick = {() => setLoginVisible(true)}>log in</button>
        </div>
        <div style = {showWhenVisible}>
          <LoginForm
            username = {username}
            password = {password}
            handleUsernameChange = {({ target }) => setUsername(target.value)}
            handlePasswordChange = {({ target }) => setPassword(target.value)}
            handleSubmit = {handleLogin}
          />
          <button onClick ={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }


  const blogFormRef = React.createRef()
  const blogForm = () => (
    <Togglable buttonLabel = "add blog" ref = {blogFormRef}>
      <BlogForm
        addBlog = {addBlog}/>
    </Togglable>
  )

  const addBlog = async (blogObject) => {

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setMessageType('success')
        setErrorMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setErrorMessage(null)
          setMessageType('error')
        }, 5000)
        blogService
          .getAll()
          .then(updatedBlogs => {
            setBlogs(updatedBlogs)
          })
      })


  }

  const deleteBlog = (id, title, author) => {
    let result = window.confirm(`remove blog ${title} by ${author}?`)
    if (result) {
      blogService
        .remove(id)

      setBlogs(blogs.filter(n => n.id !== id))
      setMessageType('success')
      setErrorMessage(`blog ${title} by ${author} successfully removed`)
      setTimeout(() => {
        setErrorMessage(null)
        setMessageType('error')
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message = {errorMessage} type = {messageType} />

      {user === null ?
        loginForm():
        <div>
          <p>{user.name} logged in</p>
          <button onClick = {handleLogout}>logout</button>
          {blogForm()}

        </div>
      }
      <h2>Blogs</h2>
      {blogsList()}
      <Footer />
    </div>
  )
}
export default App
