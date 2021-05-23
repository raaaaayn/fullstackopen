import axios from "axios";
import React, { useEffect, useState } from "react";

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
        {countries.map((obj) => (
          <p key={obj["name"]}>{obj["name"]}</p>
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
