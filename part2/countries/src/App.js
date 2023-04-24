import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'
const countryUrl = 'https://restcountries.com/v3.1/all'

const App = () => {
  const [newSearch, setNewSearch] = useState('')
  const [countries, countriesSearch] = useState('')
  const search = (event) => setNewSearch(event.target.value)

  const data = () => {
    axios
    .get(countryUrl)
    .then( response => {countriesSearch(response.data)})
  }

  useEffect(data, []) 

  let countriesDisplay = []
  if (newSearch != '')
    countriesDisplay = countries.filter(country => (country.name.common.toLowerCase().includes(newSearch.toLowerCase())))

  return (
    <div>
    <Filter newSearch={newSearch} search={search}/>
    <Countries countries={countriesDisplay} countriesSearch={setNewSearch} />
    </div>
  )
}

const Countries = ({countries, countriesSearch}) => {
  console.log(countries);
  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>
  else if (countries.length === 1)
    return <CountryDisplay country={countries[0]} />
  else {
    const sortedCountries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common))
    return <ul>{sortedCountries.map((country) => <li key={country.name.common}>{country.name.common} <button onClick={()=> countriesSearch(country.name.common)}>show</button></li>)}</ul>
  }
}

const CountryDisplay = ({country}) => {
  console.log("country", country.name)
  let name = country.name.common
  let capital = country.capital
  let area = country.area
  let languages = Object.values(country.languages)

  return (
    <div>
      <h2>{name}</h2>
        <p>capital {capital}</p>
        <p>area {area}</p>
      <h3>languages</h3>
        <ul>{languages.map(language => <li key={language}>{language}</li> )}</ul>
        <img src={country.flags.png}/>
      <Weather capital={capital} country={country}/>
      <p></p>
    </div>
  )
}
const Weather = ({capital, country}) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`;
    axios.get(url)
      .then(response => { 
        setWeather(response.data);
      })
      .catch(error => {
        setError('Failed to fetch weather data.');
      })
  }, [capital, api_key]);
  console.log("icon", [weather])
  if (error) {
    return <p>{error}</p>;
  } else if (!weather) {
    return <p>Loading weather...</p>;
  } else {
    const iconWeater = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return (
      <div> 
        <h3>Weather in {capital}</h3>
        <p>Temperature {weather.main.temp}°C</p> 
        <img src= {iconWeater} />
        <p>wind {weather.wind.speed}</p> 
      </div>
    );
  }
};


/*const Weather = ({capital, country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  console.log("api", api_key);
  console.log("country in weather", country.capital);
  const [weather, weatherData] = useState([])
  const [error, catchError] = useState('')
  const data = () => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
    .then(response => { 
      console.log("response", response.data)
      weatherData(response.data)
    })
    .catch(catchError)
  }
  useEffect(data, [capital])
  console.log("weather", weather);
  return(
   <div> 
    <h3>Weather in {capital}</h3>
    <p>Temperature {weather.main.temp}°C</p> 
   </div>
  )
  }*/

const Filter = ({ newSearch, search}) => <div>Find countries<input type="text" value={newSearch} onChange={search} /></div>

export default App;
