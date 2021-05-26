import React, { useEffect, useState } from "react";
import personMethods from "./services/persons";

const DisplayNumbers = ({ persons, setPersons }) => {
  const handleDelete = (id) => {
    personMethods
      .deletePerson(id)
      .then(() => setPersons(persons.filter((person) => person.id !== id)));
  };
  return (
    <div>
      <h3>Numbers</h3>
      <ul>
        {persons.map((person) => {
          return (
            <div key={person.name + "div"}>
              <li key={person.name}>
                {person.name} {person.number}
              </li>
              <button
                key={person.name + 1}
                onClick={() => handleDelete(person.id)}
              >
                delete
              </button>
            </div>
          );
        })}
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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumb, setNewPhoneNumb] = useState("");
  const [searchField, setSeachField] = useState("");
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    personMethods.getPersons().then((persons) => setPersons(persons));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    let hasname = false;
    let id = 0;

    persons.map((person) => {
      if (person.name.toLowerCase() === newName.toLowerCase()) {
        hasname = true;
        id = person.id;
        return null;
      }
      return null;
    });

    if (hasname) {
      if (!window.confirm("editing previous entry")) {
        return;
      }
      const newPerson = {
        name: newName,
        number: newPhoneNumb,
        id,
      };
      const changedPerson = { ...newPerson, number: newPhoneNumb };
      personMethods.editNumber(id, newPerson).then((changedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id === changedPerson.id ? changedPerson : person
          )
        );
        setNewPhoneNumb("");
        setNewName("");
      });
    } else {
      const newPerson = {
        name: newName,
        number: newPhoneNumb,
        id: persons.length + 1,
      };
      personMethods.createPerson(newPerson).then(() => {
        setPersons(persons.concat(newPerson));
        setNewPhoneNumb("");
        setNewName("");
      });
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
      <DisplayNumbers persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;
