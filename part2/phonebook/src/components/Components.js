import React from 'react'

const Filter = ({ newSearch, handleSearch }) => {
    return (
        <div>
            filter shown with <input value={newSearch} onChange={handleSearch} />
        </div>
    )
}

const PersonForm = ({ newName, newNumber, handleNameInput,
    handleNumberInput, handleAddContact }) => {
    return (
        <form>
            <div>name: <input value={newName} onChange={handleNameInput} /></div>
            <div>number: <input value={newNumber} onChange={handleNumberInput} /></div>
            <div>
                <button type="submit" onClick={handleAddContact} >add</button>
            </div>
        </form>
    )
}

const Contact = ({ person }) => {
    return (
        <div>{person.name} {person.number}</div>
    )
}

const DisplayContacts = ({ persons }) => {
    return (
        persons.map(person => <Contact key={person.name} person={person} />)
    )
}

const Persons = ({ persons, newSearch }) => {
    return (
        <div>
            <DisplayContacts persons={persons.filter(person => {
                return person.name.toLocaleLowerCase().includes(newSearch.toLocaleLowerCase())
            })} />
        </div>
    )
}

export {Filter, PersonForm, Persons}