const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const User = require('../models/user')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })
})

describe('User creation', () => {
  
    test('succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'john123',
        name: 'John Doe',
        password: 'securePass'
      }
  
      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
  
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      assert.ok(usernames.includes(newUser.username))
    })
  
    test('fails with 400 if username is missing', async () => {
      const newUser = {
        name: 'MissingUsername',
        password: 'securePass'
      }
  
      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })
  
    test('fails with 400 if password is missing', async () => {
      const newUser = {
        username: 'nopassword',
        name: 'No Password User'
      }
  
      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })
  
    test('fails with 400 if username is shorter than 3 characters', async () => {
      const newUser = {
        username: 'jo',
        name: 'Short Username',
        password: 'securePass'
      }
  
      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })
  
    test('fails with 400 if password is shorter than 3 characters', async () => {
      const newUser = {
        username: 'validUser',
        name: 'Short Password',
        password: '12'
      }
  
      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })
  
    test('fails with 400 if username is not unique', async () => {
      const newUser = {
        username: 'root',
        name: 'Duplicate User',
        password: 'securePass'
      }
  
      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })
  })
  

after(async () => {
    await mongoose.connection.close()
})