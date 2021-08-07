import React, { useState } from "react";

const BirthYearForm = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const submit = (event) => {
    event.preventDefault();

    console.log("set born year...");

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
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
