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
        
        const response = await api.post('/api/blogs')
            .send(helper.newBlog)
            .expect(201) 
            .expect('Content-Type', /application\/json/);
        
        const blogsAfterPost = await Blog.find({});
        assert.strictEqual(blogsAfterPost.length, blogsBeforPost.length + 1); 
        
        const titles = blogsAfterPost.map(blog => blog.title);
        assert.ok(titles.includes('New Blog'), 'Blog title should exist in the database')
    })

    test('if likes is missing, defaults to 0', async () => {
      
        const response = await api.post('/api/blogs')
          .send(helper.blogWithoutLikes)
          .expect(201) 
          .expect('Content-Type', /application\/json/);
      
        const savedBlog = await Blog.findOne({ title: 'Default Likes Blog' });
      
        assert.strictEqual(savedBlog.likes, 0, 'Likes should default to 0 if missing');
      });

      test('returns 400 if title or url is missing', async () => {
        const blogsBeforPost = await Blog.find({})
    
        for (const blog of helper.blogsMissingFields) {
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

describe('deleting a blog post', () => {
    test('deletes a blog successfully with status 204', async () => {
        const blogsAtStart = await Blog.find({});
        const blogToDelete = blogsAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204);  

        const blogsAtEnd = await Blog.find({});
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

        const ids = blogsAtEnd.map(b => b.id);
        assert.ok(!ids.includes(blogToDelete.id), 'Deleted blog should not exist');
    });

    test('returns 404 if blog does not exist', async () => {
        const nonExistingId = await helper.nonExistingId(); 

        const response = await api
            .delete(`/api/blogs/${nonExistingId}`)
            .expect(404);  

        assert.strictEqual(response.body.error, 'Blog not found');
    });

});


after(async () => {
    await mongoose.connection.close()
})

