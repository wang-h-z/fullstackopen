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

    test('if likes is missing, defaults to 0', async () => {
        const newBlog = {
          title: 'Default Likes Blog',
          author: 'John Doe',
          url: 'http://example.com/default',
        };
      
        const response = await api.post('/api/blogs')
          .send(newBlog)
          .expect(201) 
          .expect('Content-Type', /application\/json/);
      
        const savedBlog = await Blog.findOne({ title: 'Default Likes Blog' });
      
        assert.strictEqual(savedBlog.likes, 0, 'Likes should default to 0 if missing');
      });

      test('returns 400 if title or url is missing', async () => {
        const blogsBeforPost = await Blog.find({})
        const blogs = [
            { author: 'John Doe', url: 'http://example.com', likes: 10 }, 
            { title: 'Missing URL', author: 'Jane Doe', likes: 5 },         
        ];
    
        for (const blog of blogs) {
            const response = await api.post('/api/blogs')
                .send(blog)
                .expect(400)  
                .expect('Content-Type', /application\/json/);
    
            assert.ok(
                response.body.error.includes('title') || response.body.error.includes('url'),
                'Response error message should mention missing title or url'
            );
        }
    
        const blogsAtEnd = await Blog.find({});
        assert.strictEqual(blogsAtEnd.length, blogsBeforPost.length, 'No blogs should be added when validation fails');
    });
})

after(async () => {
    await mongoose.connection.close()
})


