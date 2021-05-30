const express = require('express')
const app = express()

app.use(express.json())

let phonebook = [
    {
        id: 1,
        name: "Sarah",
        number: "123-456-789"
    },
    {
        id: 2,
        name: "Jane",
        number: "123-456-789"
    },
    {
        id: 3,
        name: "Kim",
        number: "123-456-789"
    },
    {
        id: 4,
        name: "SJ",
        number: "123-456-789"
    },
]

app.get('/info', (request, response) => {
    const date = new Date()
    const numberOfContacts = phonebook.length
    response.send(`<div>Phonebook has info for ${numberOfContacts} people</div><br><div>${date}</div>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    contact = phonebook.filter(contact => contact.id !== id)

    const contactDetails = phonebook.find(contact => {
        return (
            contact.id === id
        )
    })

    console.log("get contact", contactDetails)

    if (contactDetails) {
        console.log(contactDetails)
        response.json(contactDetails)
    } else {
        response.status(404).end()
    }

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    contact = phonebook.filter(contact => contact.id !== id)
    phonebook = phonebook.concat(contact)
    response.status(204).end()
})

const generateId = () => {
    const maxId = phonebook.length > 0
        ? Math.max(...phonebook.map(n => n.id))
        : 0
    return maxId + Math.floor(Math.random() * 5) + 100;
}

const contactExists = (name) => {
    return phonebook.find(contact => contact.name === name)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const name = body.name
    const number = body.number

    if (!name) {
        return response.status(400).json({
            error: 'missing name'
        })
    } else if (!number) {
        return response.status(400).json({
            error: 'missing number'
        })
    } else if (contactExists(name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const contact = {
        id: generateId(),
        name: body.name,
        important: body.number,
    }

    console.log("newcontact", contact)
    phonebook = phonebook.concat(contact)
    response.json(contact)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
