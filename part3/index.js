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

const Person = require('./models/person')

app.get('/', (request, response) => {
  response.send('<h1>Phonebook!!</h1>')
})
  
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons=> {
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

  const info = `<p>Phonebook has info for ${persons.length} people</p><p>${formattedDate}</p>`
  response.send(info)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = Person.findById(id).then(person=>{
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
})

const generateId = () => {
    const randomId = persons.length > 0
      ? Math.floor(Math.random() * 1000000)
      : 0
    return String(randomId)
}

const isDuplicateName = (name) => {
  return persons.some(person => person.name.toLowerCase() === name.toLowerCase())
}
  
app.post('/api/persons', (request, response) => {
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

  if (isDuplicateName(body.name)) {
    return response.status(400).json({
      error: 'name must be unique (case insensitive)'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  
  person.save().then(savedPerson=>{
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)

  Person.findByIdAndDelete(id).then(result=>{
    response.status(204).end()
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})