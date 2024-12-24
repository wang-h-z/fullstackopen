const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/',  async (request, response) => {
    const blog = new Blog(request.body)
    
    if (!blog.title || !blog.url) {
      return response.status(400).json({error: 'title or url is missing'})
    }

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    const deletedBlog = await Blog.findByIdAndDelete(id)

    if (deletedBlog) {
      response.status(204).end(); 
  } else {
      response.status(404).json({ error: 'Blog not found' }); 
  }
})

module.exports = blogsRouter