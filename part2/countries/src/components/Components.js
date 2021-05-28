import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'

const FindCountry = ({ value, handleFindCountry }) => {
    return (
        <div>find countries <input value={value} onChange={handleFindCountry}></input></div>
    )
}

const ShowWeather = ({ weather }) => {
    const { temperature, weather_icons, wind_speed, wind_dir } = weather.current
    return (
        <div>
            <div><strong>temperature: </strong>{temperature} Celcius</div>
            <img width={'75px'} src={weather_icons[0]} alt={'weather icon'} />
            <div><strong>wind: </strong>{wind_speed} km/h direction {wind_dir}</div>
        </div>
    )
}

const CountryDetails = ({ country }) => {
    const [weather, setWeather] = useState('')
    const { name, capital, population, languages, flag } = country
    const api_key = process.env.REACT_APP_API_KEY

    const hook = () => {
        const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${name}`
        axios
            .get(url)
            .then(response => {
                const data = response.data
                setWeather(data)
            })
    }

    useEffect(hook, [name, api_key])

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
            <h3>Weather in {name}</h3>
            {weather ? <ShowWeather weather={weather} /> : ''}
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