import { useState } from "react"

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false)
  const hideWhenVisible = { display: showDetails ? 'none' : '' }
  const showWhenVisible = { display: showDetails ? '' : 'none' }
  
  const handleLike = () => {
    addLike(blog)
  }

  const canDelete = blog.user?.username === user?.username

  return (
    <div className="blog">
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user?.username}</div>
          {canDelete && <button onClick={() => deleteBlog(blog)}>remove</button>}
        </div>
      )}
    </div>
    </div>
  )}

export default Blog