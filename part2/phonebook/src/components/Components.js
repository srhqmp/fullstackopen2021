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

// const DisplayContacts = ({ persons, handleDeleteContact }) => {
//     return (
//         persons.map((person, i) => <Contact key={person.id} person={person} handleDeleteContact={handleDeleteContact(i)} />)
//     )
// }

// const Persons = ({ persons, newSearch, handleDeleteContact }) => {
//     return (
//         <div>
//             <DisplayContacts persons={persons.filter(person => {
//                 return person.name.toLocaleLowerCase().includes(newSearch.toLocaleLowerCase())
//             })} handleDeleteContact={handleDeleteContact} />
//         </div>
//     )
// }

export { Filter, PersonForm, Contact }