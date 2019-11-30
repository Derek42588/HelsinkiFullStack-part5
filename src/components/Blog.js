/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const Blog = ({ blog, addLike, user, deleteBlog }) => {
  const [expanded, setExpanded] = useState(false)

  const hideWhenVisible = { display: expanded ? 'none' : '' }
  const showWhenVisible = { display: expanded ? '' : 'none' }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const clickLike = (event) => {
    event.stopPropagation()
    addLike(blog)
  }

  const clickDelete = (event) => {
    deleteBlog(blog.id, blog.title, blog.author)
  }

  const showDelete = () => {
    return (
      <button onClick = {clickDelete}>delete</button>
    )
  }

  const showBlog = () => {
    return (
      <div style = {blogStyle} className = "blog">
        <div onClick = {toggleExpanded} style = {hideWhenVisible} className = 'truncated'>
          {blog.title} {blog.author}
        </div>
        <div onClick = {toggleExpanded} style = {showWhenVisible} className = 'expanded'>
          <p>
            {blog.title} by {blog.author}
          </p>
          <p>
            <a href = {blog.url}>{blog.url}</a>
          </p>
          <p>
            {blog.likes} likes <button onClick = {clickLike}>likes</button>
          </p>
          <p>
          added by {blog.user.username}
          </p>
          {
            user.username === blog.user.username ?
              showDelete()
              :
              null
          }
        </div>

      </div>
    )

  }

  return (
    <div >
      {
        user === null ?
          null:
          showBlog()
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog