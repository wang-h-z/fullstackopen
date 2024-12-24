const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/',  async (request, response, next) => {
    const blog = new Blog(request.body)
    
    if (!blog.title || !blog.url) {
      return response.status(400).json({error: 'title or url is missing'})
    }

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter