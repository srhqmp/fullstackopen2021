import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import phonebookService from "./service/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newNameSearch, setNewNameSearch] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    classification: null,
  });

  useEffect(() => {
    phonebookService.getAll().then((personsData) => setPersons(personsData));
  }, []);

  const handleNameChange = (e) => {
    const name = e.target.value;
    setNewName(name);
  };

  const handleNumberChange = (e) => {
    const number = e.target.value;
    setNewNumber(number);
  };

  const handleNameSearch = (e) => {
    const nameSearch = e.target.value;
    setNewNameSearch(nameSearch);
  };

  const personExists = (name) => {
    return persons.filter((person) => person.name === name).length > 0;
  };

  const getPersonNameById = (id) => {
    return persons.find((person) => person.id.toString() === id).name;
  };

  const getPersonObjectByName = (name) => {
    return persons.find(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );
  };

  const handleNotification = (message, classification) => {
    const notif = {
      message,
      classification,
    };
    setNotification(notif);
    setTimeout(() => {
      setNotification({
        message: null,
        classification: null,
      });
    }, 5000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();

    if (personExists(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personObject = getPersonObjectByName(newName);
        const updatedPerson = { ...personObject, number: newNumber };

        phonebookService
          .updatePerson(personObject.id, updatedPerson)
          .then((personData) => {
            setPersons(
              persons.map((person) =>
                person.id === personData.id ? personData : person
              )
            );
            setNewName("");
            setNewNumber("");
            const notif = `Updated ${personData.name}'s number`;
            handleNotification(notif, "success");
          });
      } else {
        setNewName("");
        setNewNumber("");
        return;
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        date: new Date().toISOString(),
      };

      phonebookService.create(newPerson).then((personData) => {
        setPersons(persons.concat(personData));
        setNewName("");
        setNewNumber("");

        const notifMessage = `Successfully added ${newName}`;
        handleNotification(notifMessage, "success");
      });
    }
  };

  const handleDeletePerson = (e) => {
    const id = e.target.value;
    const name = getPersonNameById(id);

    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id.toString() !== id));
        })
        .catch(() => {
          const notif = `Information about ${name} has already been removed from the server`;
          handleNotification(notif, "error");
        });
    }
  };

  const personsToShow = newNameSearch
    ? persons.filter(({ name }) => {
        return name.toLowerCase().includes(newNameSearch.toLowerCase());
      })
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification["message"]}
        classification={notification["classification"]}
      />
      <Filter handleNameSearch={handleNameSearch} />
      <h2>Add a new</h2>
      <PersonForm
        handleContactSubmit={handleContactSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
