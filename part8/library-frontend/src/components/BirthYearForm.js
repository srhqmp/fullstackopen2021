import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";

const BirthYearForm = ({ authors }) => {
  const [name, setName] = useState(authors[0].name);
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = (event) => {
    event.preventDefault();

    console.log("set born year...");
    editAuthor({ variables: { name, setBornTo: parseInt(born) } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        {/* <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div> */}
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map((author) => {
            console.log(author);
            return (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            );
          })}
        </select>
        <div>
          born{" "}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthYearForm;
