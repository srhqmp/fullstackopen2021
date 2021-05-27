import React, { useState } from 'react'

const Contact = ({person}) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

const DisplayContacts = ({persons}) => {
  return (
    persons.map(person => <Contact key={person.name} person={person} />)
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'd', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

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
      setPersons(persons.concat(newContact))
      setNewName('')
      setNewNumber('')
    } 
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with <input value={newSearch} onChange={handleSearch} />
      </div>
      <form>
        <h2>Add new</h2>
        <div>name: <input value={newName} onChange={handleNameInput} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberInput} /></div>
        <div>
          <button type="submit" onClick={handleAddContact} >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <DisplayContacts persons={persons.filter(person => {
          return person.name.toLocaleLowerCase().includes(newSearch.toLocaleLowerCase())
        })} />
      </div>
    </div>
  )
}

export default App