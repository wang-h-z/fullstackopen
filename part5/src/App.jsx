import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNotification = (message, error) => {
    setNotification({ message, error })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      handleNotification("wrong username or password", 'error')
    }
  }

  const addBlog = (blogObject) => {
    const createdBlog = blogService.create(blogObject).then(blogObject => {
      setBlogs(blogs.concat(blogObject))
    })
    blogFormRef.current.toggleVisibility()
    handleNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'success')
  }

  const addLike = (blog) => {
    const updatedBlog = {
      ...blog, 
      likes: blog.likes + 1, 
    }
  
    blogService.update(updatedBlog).then((returnedBlog) => {
      setBlogs(blogs.map((currentBlog) =>
        currentBlog.id === blog.id ? returnedBlog : currentBlog
      ))
    })
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <Notification
          notification={notification}
        />
        <LoginForm 
          handleLogin={handleLogin} 
          username={username} 
          setUsername={setUsername} 
          password={password} 
          setPassword={setPassword} 
        />
      </div>
    )
  }
  return (
    <div>
        <Notification
          notification={notification}
        />
      <h2>blogs</h2>
        <div className="user-container">
          <p>{user.name} logged in</p>
          <button onClick={() => handleLogout()}>logout</button>
        </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} />
      )}

    </div>
  )
}

export default App