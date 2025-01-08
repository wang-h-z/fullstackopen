import React from 'react'

const BlogForm = ({addBlog, newBlog, handleBlogChange}) => {
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