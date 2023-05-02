const http = require('http')
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = 3001

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(persons=> persons.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

app.get('/api/info', (request, response) => {
    const currentTime = new Date()
    const personNumber =  persons.length
    response.send(`<p>Phonebook has ${personNumber} people</p>\n<p>${currentTime}</p>`) 
})

app.get ('/', (request, response) => {
    response.send('<h1>au max</h1>')
})

app.post('/api/persons', (request, response) => {
    const person = request.body

    console.log(person.name)

    if (!person.name || !person.number) {
        return response.status(400).json({error : 'name or number missing'})
    }

    const existingPerson = persons.find(p => p.number === person.number)
    if (existingPerson) {
      return response.status(400).json({ error: 'number must be unique' })
    }

    const randomId = Math.floor(Math.random() * 1000) + 1 
    console.log(randomId);
    person.id = randomId

    persons = persons.concat(person)
  
    response.json(person)
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(persons => persons.id !== id)
  
    response.status(204).end()
  })

app.listen(PORT)