import React from "react";
import Person from "./Person";

const Persons = ({ personsToShow, handleDeletePerson }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          id={person.id}
          handleDeletePerson={handleDeletePerson}
        />
      ))}
    </ul>
  );
};

export default Persons;
