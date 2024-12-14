require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(
  morgan(':method :url :status :response-time ms - :res[content-length] :body')
);

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

const Person = require('./models/person')

app.get('/', (request, response) => {
  response.send('<h1>Phonebook!!</h1>')
})
  
app.get('/api/persons', (request, response) => {
  Person.find({})
  .then(persons=> {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const currentTime = new Date()
  const formattedDate = currentTime.toLocaleString('en-US', {
    timeZone: 'Europe/Helsinki',
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  });
  Person.countDocuments({}).then(count=>{
    const info = `<p>Phonebook has info for ${count} people</p><p>${formattedDate}</p>`
    response.send(info)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const person = Person.findById(id)
  .then(person=>{
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error=> next(error))
})

const generateId = () => {
    const randomId = persons.length > 0
      ? Math.floor(Math.random() * 1000000)
      : 0
    return String(randomId)
}

  
app.post('/api/persons', (request, response, next) => {
    const body = request.body
 
  if (!body.name) {
    return response.status(400).json({
      error: 'missing name'
    })
  }
  
  if (!body.number) {
    console.log("no number")
    return response.status(400).json({
      error: 'missing number'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  
  person.save()
  .then(savedPerson=>{
    response.json(savedPerson)
  })
  .catch(error=> next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  const id = request.params.id
  
  const person = {
    name,
    number,
  }

  Person.findByIdAndUpdate(id, person)
    .then((updatedPerson) => {
      if (!updatedPerson) {
        return response.status(404).end()
      }
      response.json(updatedPerson)
    })
    .catch(error=> next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
  .then(result=>{
    response.status(204).end()
  })
  .catch(error=> next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})