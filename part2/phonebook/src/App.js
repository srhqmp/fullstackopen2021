import React, { useState } from 'react'

const DisplayContact = ({contact}) => {
  return (
    <div>{contact.name} {contact.number}</div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '011101010100010100101' },
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber ] = useState('') 

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const contactExists = (name) => persons.some(person => person.name === name)
  
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
      <h2>Phonebook</h2>
      <form>
        <div>name: <input value={newName} onChange={handleNameInput} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberInput} /></div>
        <div>
          <button type="submit" onClick={handleAddContact} >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <DisplayContact key={person.name} contact={person} />)}
      </div>
    </div>
  )
}

export default App