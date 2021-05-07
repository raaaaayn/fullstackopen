import React from "react";

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = (props) => {
  const [a, b, c] = props.pack;

  return (
    <div>
      <p>
        {c.name} {c.exercises}
      </p>
      <p>
        {a.name} {a.exercises}
      </p>

      <p>
        {b.name} {b.exercises}
      </p>
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.n1 + props.n2 + props.n2}</p>
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";

  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content pack={parts} />
      <Total
        n1={parts[0].exercises}
        n2={parts[1].exercises}
        n3={parts[2].exercises}
      />
    </div>
  );
};

export default App;
