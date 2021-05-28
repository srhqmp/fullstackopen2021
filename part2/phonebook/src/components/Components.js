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
                <button type="submit" onClick={handleAddContact}>add</button>
            </div>
        </form>
    )
}

const Contact = ({ person, handleDeleteContact }) => {
    return (
        <div>{person.name} {person.number} <button onClick={handleDeleteContact}>delete</button></div>
    )
}

export { Filter, PersonForm, Contact }