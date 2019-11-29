import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'


const BlogForm = (props) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')


    const blogSubmit = (event) => {
        event.preventDefault()
        const blogObject = {
            title: newTitle,
            author: newAuthor,
            url: newUrl
        }
        props.addBlog(blogObject)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }
    return (
        <form onSubmit={blogSubmit}>
            <div>
              title:
              <input
                type = "text"
                value={newTitle}
                name="Title"
                onChange={({ target }) => setNewTitle(target.value)}
              />
              </div>
            <div>
              author:
              <input
                type = "text"
                value={newAuthor}
                name="Author"
                onChange={({ target }) => setNewAuthor(target.value)}
              />
              </div>
            <div>
              url:
              <input
                type = "text"
                value={newUrl}
                name="Url"
                onChange={({ target }) => setNewUrl(target.value)}
              />
              </div>
              <button type="submit">save</button>
            </form>  
          )

  }

export default BlogForm