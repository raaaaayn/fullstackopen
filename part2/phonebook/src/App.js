import React, { useState } from "react";

const DisplayNumbers = ({ persons }) => {
  return (
    <div>
      <h3>Numbers</h3>
      <ul>
        {persons.map((person) => (
          <li key={persons.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Search = ({ handleFormSearch, searchField, handleSearch }) => {
  return (
    <div>
      <form onSubmit={handleFormSearch}>
        <div>
          enter you search here:
          <input value={searchField} onChange={handleSearch} />
        </div>
      </form>
    </div>
  );
};

const AddPerson = (props) => {
  return (
    <div>
      <h3>Add New</h3>
      <form onSubmit={props.addPerson}>
        <div>
          name:{" "}
          <input value={props.newName} onChange={props.handleNameChange} />
        </div>

        <div>
          phone number:
          <input
            value={props.newPhoneNumb}
            onChange={props.handlePhoneChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumb, setNewPhoneNumb] = useState("");
  const [searchField, setSeachField] = useState("");
  const [matched, setMatched] = useState([]);

  const addPerson = (e) => {
    e.preventDefault();
    let hasnamenum = false;

    persons.map((person) => {
      if (
        person.number === newPhoneNumb ||
        person.name.toLowerCase() === newName.toLowerCase()
      ) {
        hasnamenum = true;
        return null;
      }
      return null;
    });

    if (hasnamenum) {
      alert("man that number/name already exists");
    } else {
      const newPerson = { name: newName, number: newPhoneNumb };
      setPersons(persons.concat(newPerson));
      setNewPhoneNumb("");
      setNewName("");
    }
  };

  const handlePhoneChange = (e) => {
    setNewPhoneNumb(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let searchbar = e.target.value;
    setSeachField(searchbar);
    var regex = new RegExp(searchField, "gi");
    let names = persons.map((person) => person.name + ": " + person.number);
    let matche = names.filter((name) => regex.test(name));
    setMatched(matche);
  };

  const handleFormSearch = (e) => {
    e.preventDefault();
    setSeachField("");
  };

  const DisplaySearched = ({ matched }) => {
    return (
      <div>
        <ul>
          {matched.map((ele, i) => (
            <li key={i + String(Math.floor(Math.random() * 300))}>{ele}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search
        handleFormSearch={handleFormSearch}
        handleSearch={handleSearch}
        searchField={searchField}
      />
      <DisplaySearched matched={matched} />
      <AddPerson
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhoneNumb={newPhoneNumb}
        handlePhoneChange={handlePhoneChange}
      />
      <DisplayNumbers persons={persons} />
    </div>
  );
};

export default App;
