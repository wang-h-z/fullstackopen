import React from 'react'
import { useState } from 'react'

const BlogForm = ({createBlog}) => {

    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: ''
    })

    const addBlog = (event) => {
        event.preventDefault()
        createBlog(newBlog)
        setNewBlog({
            title: '',
            author: '',
            url: ''
        })
    }

    const handleBlogChange = event => {
        const {name, value} = event.target
        setNewBlog((newBlog) => ({
          ...newBlog,
          [name]: value,
        }))
      }

    return (
        <form onSubmit={addBlog}>
        <div>title:
            <input
                name="title"
                value={newBlog.title}
                onChange={handleBlogChange}
            />
        </div>
        <div>author:
            <input
                name="author"
                value={newBlog.author}
                onChange={handleBlogChange}
            />
        </div>
        <div>url:
            <input
                name="url"
                value={newBlog.url}
                onChange={handleBlogChange}
            />
        </div>
            <button type="submit">save</button>
        </form>  
    )
}

export default BlogForm