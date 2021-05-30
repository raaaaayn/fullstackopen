const express = require("express");
app = express();

const persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "poopinpi",
    number: "23141223132",
    id: 5,
  },
];

app.get("/api/persons", (req, resp) => {
  resp.json(persons);
});

app.get("/api/info", (req, resp) => {
  resp.send(
    `phone book info has info about ${persons.length} people\n${new Date()}`
  );
});

app.get("/api/persons/:id", (req, resp) => {
  id = req.params.id;
  const person = persons.find((person) => person.id == id);
  if (person) {
    resp.json(person);
  } else {
    resp.send(404).end();
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
