import React, { useState, useEffect } from 'react'
import { Filter, PersonForm, Persons } from './components/Components'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    const url = 'http://localhost:3002/persons'
    axios
      .get(url)
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const contactExists = (name) => persons.some(person => person.name === name)

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleAddContact = (event) => {
    event.preventDefault()
    const newContact = {
      name: newName,
      number: newNumber,
    }

    if (contactExists(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const url = 'http://localhost:3002/persons'
      axios
        .post(url, newContact)
        .then(response => {
          setPersons(persons.concat(newContact))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={newSearch} handleSearch={handleSearch} />
      <h2>Add new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput} handleAddContact={handleAddContact} />
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} />
    </div>
  )
}

export default App