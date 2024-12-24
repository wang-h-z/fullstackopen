const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('testing GET requests', () => {
    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
        })

    test('returns the correct amout of blog posts', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('all blogs have id instead of _id', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body

        blogs.forEach(blog => {
            assert.ok(blog.id)
            assert.strictEqual(blog._id, undefined)
        })
    })
})

describe('testing POST requests', () => {
    test('blogs are successfuly created', async () => {

        const blogsBeforPost = await Blog.find({})

        const newBlog = {
            title: 'New Blog',
            author: 'Jane Doe',
            url: 'http://example.com/new',
            likes: 7,
          };
        
        const response = await api.post('/api/blogs')
            .send(newBlog)
            .expect(201) 
            .expect('Content-Type', /application\/json/);
        
        const blogsAfterPost = await Blog.find({});
        assert.strictEqual(blogsAfterPost.length, blogsBeforPost.length + 1); 
        
        const titles = blogsAfterPost.map(blog => blog.title);
        assert.ok(titles.includes('New Blog'), 'Blog title should exist in the database')
    })
})

after(async () => {
    await mongoose.connection.close()
})


