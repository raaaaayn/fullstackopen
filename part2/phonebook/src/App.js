import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "9620945569" },
  ]);

  const [newName, setNewName] = useState("");

  const [newPhoneNumb, setNewPhoneNumb] = useState("");

  const addPerson = (e) => {
    e.preventDefault();
    let hasnamenum = false;

    persons.map((person) => {
      if (
        person.number === newPhoneNumb ||
        person.name.toLowerCase() === newName.toLowerCase()
      ) {
        hasnamenum = true;
      }
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>

        <div>
          phone number:
          <input value={newPhoneNumb} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
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

export default App;
