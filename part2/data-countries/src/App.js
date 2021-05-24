import axios from "axios";
import React, { useEffect, useState } from "react";

const RenderWeatherDeets = ({ city }) => {
  console.log("inside render weatherdata");
  const [weatherData, setweatherData] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY;
  console.log(api_key);
  useEffect(() => {
    console.log("inside weatherdatas effect");
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`
      )
      .then((response) => {
        let arr = [];
        setweatherData(arr.concat(response.data));
        console.log("weatherData inside .then", weatherData);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {weatherData.map((weather) => {
        return (
          <div>
            {console.log(weather)}
            <h4>Current weather in {weather.location.name}</h4>
            <img src={weather.current.weather_icons} alt="weather icon" />
            <div>
              {weather.current.weather_descriptions.map((description) => (
                <div key={description}>{description}</div>
              ))}
            </div>
            <div>Temperature {weather.current.temperature}</div>
            <div>Feels like {weather.current.feelslike}</div>
            <div>Wind speed {weather.current.wind_speed} knots</div>
          </div>
        );
      })}
    </div>
  );
};

const RenderDeets = ({ country }) => {
  const [visibilty, setvisibility] = useState(0);
  if (visibilty === 0) {
    return (
      <div>
        {country.name}
        <button onClick={() => setvisibility(1)}>Show</button>
      </div>
    );
  } else if (visibilty === 1) {
    return (
      <div>
        <h3>{country.name}</h3>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h4>Currencies</h4>
        <ul>
          {country.currencies.map((currency) => (
            <li key={currency.code}>
              {currency.code} ({currency.name})
            </li>
          ))}
        </ul>
        <h4>Languages</h4>
        <ul>
          {country.languages.map((language) => (
            <li key={language.iso639_1}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt="flag" height="16%" width="16%" />
        <button onClick={() => setvisibility(0)}>Hide</button>
        <RenderWeatherDeets city={country.capital} />
      </div>
    );
  }
};

const RenderRestApiData = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many results, please narrow down your search({countries.length}{" "}
        results)
      </div>
    );
  } else if (countries.length === 1) {
    const country = countries[0];
    return (
      <div>
        <h3>{country.name}</h3>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h4>Currencies</h4>
        <ul>
          {country.currencies.map((currency) => (
            <li key={currency.code}>
              {currency.code} ({currency.name})
            </li>
          ))}
        </ul>
        <h4>Languages</h4>
        <ul>
          {country.languages.map((language) => (
            <li key={language.iso639_1}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt="flag" height="16%" width="16%" />
      </div>
    );
  } else {
    return (
      <div>
        {countries.map((country) => (
          <RenderDeets key={country.name} country={country} />
        ))}
      </div>
    );
  }
};

const Search = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSearch}>
        <div>
          search for countries
          <input
            value={props.searchField}
            onChange={props.handleSearchFieldChange}
          />
        </div>
      </form>
    </div>
  );
};

const App = () => {
  const [countrySearched, setcountrySearched] = useState("");
  const [searchResults, setsearchResults] = useState([]);
  const [searchField, setsearchField] = useState("");

  const countriesHook = () => {
    axios
      .get("https://restcountries.eu/rest/v2/name/" + countrySearched)
      .then((response) => setsearchResults(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(countriesHook, [countrySearched]);

  const handleSearch = (e) => {
    e.preventDefault();
    setcountrySearched(searchField);
    setsearchField("");
  };

  const handleSearchFieldChange = (e) => {
    e.preventDefault();
    setsearchField(e.target.value);
  };

  return (
    <div>
      <Search
        handleSearch={handleSearch}
        handleSearchFieldChange={handleSearchFieldChange}
        searchField={searchField}
      />
      <RenderRestApiData countries={searchResults} />
    </div>
  );
};

export default App;
