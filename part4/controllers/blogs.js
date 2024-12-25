const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})
  
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    
    const user = request.user
    if (!user) {
      return response.status(401).json({ error: 'token invalid' })
    }
    
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

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const id = request.params.id
    if (!request.user) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const deletedBlog = await Blog.findById(id).populate('user')
    
    if (deletedBlog) {
      if (deletedBlog.user.toString() !== request.user.toString()) {
        return response.status(401).json({error: 'invalid user'})
      }
      await Blog.findByIdAndDelete(id)
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