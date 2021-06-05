import React, { useState, useEffect } from 'react'
import { Filter, PersonForm, Contact, Notification } from './components/Components'
import contactService from './service/contact'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(contacts => {
        setPersons(contacts)
      })
  }, [])

  const contactExists = (name, number) => persons.some(person => person.name === name && person.number === number)

  const differentNumber = (name, number) => persons.some(person => person.name === name && person.number !== number)

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

    if (!newName) {
      setErrorMessage(
        'Please add a name'
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else if (!newNumber) {
      setErrorMessage(
        'Please add a number'
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else if (contactExists(newName, newNumber)) {
      setErrorMessage(
        `${newName} is already added to phonebook`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else if (differentNumber(newName, newNumber)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons.find(person => person.name === newName).id
        contactService
          .updateContact(id, newContact)
          .then(added => {
            setPersons(persons.map(person => person.id !== id ? person : added))
            setSuccessMessage(`Updated number of ${newName}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(JSON.stringify(error.response.data.error).replace(/"([^"]+)":/g, ''))
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)

            console.log('error', error.response.data)
          })
      }
    } else {
      contactService
        .addContact(newContact)
        .then(addedContact => {
          setSuccessMessage(`Added ${addedContact.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setPersons(persons.concat(addedContact))
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          setErrorMessage(JSON.stringify(error.response.data.error).replace(/"/g, ''))
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

          console.log(error.response.data)
        })
    }
  }

  const handleDeleteContact = (id) => {
    const contactToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${contactToDelete.name} ?`)) {
      contactService.deleteContact(id)
        .then(message => {
          console.log('sarahhh')
          setPersons(persons.filter(person => person.id !== id))
          setSuccessMessage(`Deleted ${contactToDelete.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(message => {
          console.log('errroooor')
          setErrorMessage(`Information of ${contactToDelete.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} className={'error'} />
      <Notification message={successMessage} className={'success'} />
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