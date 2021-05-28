import React, { useState, useEffect } from 'react'
import { Filter, PersonForm, Contact } from './components/Components'
import contactService from './service/contact'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then(contacts => {
        setPersons(contacts)
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
      contactService
        .addContact(newContact)
        .then(addedContact => {
          setPersons(persons.concat(addedContact))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDeleteContact = (id) => {
    const contactToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${contactToDelete.name} ?`)) {
      contactService.deleteContact(id)
      setPersons(persons.filter(person => person.id !== id))
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
      {persons.filter(person => {
        return person.name.toLocaleLowerCase().includes(newSearch.toLocaleLowerCase())
      }).map((person) => {
        return (<Contact key={person.id} person={person} handleDeleteContact={() => handleDeleteContact(person.id)} />)
      })
      }
    </div>
  )
}

export default App