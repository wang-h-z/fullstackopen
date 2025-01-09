import { useState } from "react"

const Blog = ({ blog }) => {
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
  
  return (
  <div>
    <div style={{...blogStyle, ...hideWhenVisible}}>
      {blog.title}
      <button onClick={() => setShowDetails(!showDetails)}>view</button>
    </div>
    <div style={{ ...blogStyle, ...showWhenVisible }}>
      {blog.title} 
      <button onClick={() => setShowDetails(!showDetails)}>hide</button>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button>like</button></div>
      <div>{blog.user?.username}</div>
    </div> 
  </div>  
)}

export default Blog