require('dotenv').config()

const express = require('express')
const app = express()

const Phonebook = require('./models/phonebook')

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.static('build'))



app.get('/api/phonebook', (request, response) => {
  Phonebook.find({}).then(person => {
    response.json(person)
  })
})

app.get('/api/phonebook/:id', (request, response) => {
  Phonebook.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/phonebook/:id', (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/phonebook/', (request, response, next) => {
  const newContact = new Phonebook({
    name: request.body.name,
    number: request.body.number,
  })
  newContact.save().then(savedContact => {
    response.json(savedContact)
  }).catch(error => next(error))
})

app.put('/api/phonebook/:id', (request, response, next) => {
  const person = {
    // name: request.body.name,
    number: request.body.number
  }

  Phonebook.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedContact => {
      console.log('updatedContact:', updatedContact)
      response.json(updatedContact)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)