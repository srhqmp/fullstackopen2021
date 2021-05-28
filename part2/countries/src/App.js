import React from 'react';
import { FindCountry, FilterCountries } from './components/Components'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [newSearch, setSearch] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('success fetch')
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFindCountry = (event) => {
    setSearch(event.target.value)
  }

  const handleShow = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <FindCountry value={newSearch} handleFindCountry={handleFindCountry} />
      <br />
      <FilterCountries countries={countries} newSearch={newSearch} handleShow={handleShow} />
    </div>
  );
}

export default App;
