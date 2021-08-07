import { useState } from "react";
import "./App.css";
import { useQuery } from "@apollo/client";
import { ALL_PERSONS } from "./queries";

import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notify from "./components/Notify";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_PERSONS);
  // const result = useQuery(ALL_PERSONS, {
  //   pollInterval: 2000
  // })

  // The field loading is true if the query has not received a response yet.
  console.log(result);
  if (result.loading) {
    return <div>loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <PersonForm setError={notify} />
      <Persons persons={result.data.allPersons} />
    </div>
  );
};

export default App;
