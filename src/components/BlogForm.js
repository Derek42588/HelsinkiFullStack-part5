import React from 'react'


const BlogForm = ({
  
  title,
  url,
  author,
  handleSubmit
}) => {
  let t = {
    type: title.type,
    value: title.value,
    onChange: title.onChange,
  }
  let a = {
    type: author.type,
    value: author.value,
    onChange: author.onChange,
  }
  let u = {
    type: url.type,
    value: url.value,
    onChange: url.onChange,
  }
  return (
    <form onSubmit={handleSubmit} id = "addBlog">
      <div>
              title:
        <input
          {...t}
        />
      </div>
      <div>
              author:
        <input
          {...a}

        />
      </div>
      <div>
              url:
        <input
          {...u}

        />
      </div>
      <button type="submit">save</button>
    </form>
  )

}

export default BlogForm