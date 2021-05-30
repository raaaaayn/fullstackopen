const express = require("express");

app = express();
app.use(express.json());

let persons = [
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
  const id = req.params.id;
  const person = persons.find((person) => person.id == id);
  if (person) {
    resp.json(person);
  } else {
    resp.send(404).end();
  }
});

app.delete("/api/persons/:id", (req, resp) => {
  const id = req.params.id;
  const persontobedelete = persons.find((person) => person.id == id);
  if (persontobedelete) {
    console.log(persontobedelete, "has been deleted");
    persons = persons.filter((person) => person.id != id);
    resp.sendStatus(204).end();
  } else {
    console.log("person does not exist");
    resp.sendStatus(204).end();
  }
});

const generateid = () => Math.floor(Math.random() * 6999);

app.post("/api/persons", (req, resp) => {
  const newperson = {
    name: req.body.name,
    number: req.body.number,
    id: generateid(),
  };
  if (newperson.name && newperson.number) {
    if (persons.find((person) => person.name.toLowerCase() == newperson.name)) {
      resp.status(404).send({ error: "person already exists" });
    } else {
      persons = persons.concat(newperson);
      resp.sendStatus(204).end();
      console.log(JSON.stringify(newperson));
    }
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
