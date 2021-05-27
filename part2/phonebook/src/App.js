import React, { useState } from 'react'

const DisplayContact = ({contact}) => {
  return (
    <div>{contact.name}</div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' },
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const contactExists = (name) => persons.some(person => person.name === name)
  
  const handleAddContact = (event) => {
    event.preventDefault()
    const newContact = {
      name: newName,
    }

    if (contactExists(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newContact))
      setNewName('')
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
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