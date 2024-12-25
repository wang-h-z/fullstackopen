const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { error } = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})
  
blogsRouter.post('/',  async (request, response) => {
    const user = await User.findOne({})
    const blog = new Blog({
      ...request.body,
      user: user
    })

    if (!blog.title || !blog.url) {
      return response.status(400).json({error: 'title or url is missing'})
    }

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
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

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true, runValidators: true})

  response.json(updatedBlog)
})

module.exports = blogsRouter