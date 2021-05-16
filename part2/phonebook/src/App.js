import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const addName = (e) => {
    let hasName = false;
    e.preventDefault();

    persons.map((person) => {
      if (person.name.toLowerCase() === newName.toLowerCase()) {
        hasName = true;
      }
    });

    if (hasName) {
      alert("man that name already exists");
    } else {
      const newPerson = { name: newName };
      setPersons(persons.concat(newPerson));
      setNewName(" ");
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, i) => (
          <li key={i}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
