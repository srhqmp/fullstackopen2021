import React from "react";

const Person = ({ name, number, id, handleDeletePerson }) => {
  return (
    <li>
      <div>
        {name} {number}{" "}
        <button value={id} onClick={handleDeletePerson}>
          delete
        </button>
      </div>
    </li>
  );
};

export default Person;
