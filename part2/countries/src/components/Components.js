import React from 'react';

const FindCountry = ({ value, handleFindCountry }) => {
    return (
        <div>find countries <input value={value} onChange={handleFindCountry}></input></div>
    )
}

const CountryDetails = ({ country }) => {
    const { name, capital, population, languages, flag } = country

    return (
        <div>
            <h2>{name}</h2>
            <div>capital {capital}</div>
            <div>population {population}</div>
            <h3>languages</h3>
            <ul>
                {
                    languages.map(language => <li key={language.name}>{language.name}</li>)
                }
            </ul>
            <img width={'150px'} src={flag} alt={name} />
        </div>
    )
}

const ListCountries = ({ countries, newSearch, handleShow }) => {
    const countriesSize = countries.length

    if (countriesSize > 10 && newSearch) {
        return <div>Too many matches, specify another filter</div>
    }

    if (countriesSize === 1) {
        return (<CountryDetails country={countries[0]} />)
    }

    return countries.map(country => {
        if (countriesSize <= 10) {
            return (
                <div key={country.numericCode}>
                    {country.name} 
                    <button value={country.name} onClick={handleShow}>show</button>
                </div>
            )
        }

        return <div key={country.numericCode}>{country.name}</div>
    })
}

const FilterCountries = ({ countries, newSearch, handleShow }) => {
    return (
        <div>
            {
                <ListCountries countries={countries
                    .filter(country => {
                        return country.name.toLowerCase()
                            .includes(newSearch.toLowerCase())
                    }
                    )} newSearch={newSearch} handleShow={handleShow} />
            }
        </div>
    )
}

export { FindCountry, FilterCountries }