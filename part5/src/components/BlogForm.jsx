import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

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
                id='title-input'
            />
        </div>
        <div>author:
            <input
                name="author"
                value={newBlog.author}
                onChange={handleBlogChange}
                id='author-input'
            />
        </div>
        <div>url:
            <input
                name="url"
                value={newBlog.url}
                onChange={handleBlogChange}
                id='url-input'
            />
        </div>
            <button type="submit">save</button>
        </form>  
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm