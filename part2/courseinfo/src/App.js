import React from "react";

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        { name: "Fundamentals of React", exercises: 10, id: 1 },
        { name: "Using props to pass data", exercises: 7, id: 2 },
        { name: "State of a component", exercises: 14, id: 3 },
        { name: "Redux", exercises: 11, id: 4 },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        { name: "Routing", exercises: 3, id: 1 },
        { name: "Middlewares", exercises: 7, id: 2 },
      ],
    },
  ];
  return (
    <div>
      {courses.map((ele, pos) => {
        let no_of_exercies = 0;
        return (
          <div key={pos}>
            <h1>{ele.name}</h1>
            <ul>
              {ele.parts.map((elee, i) => {
                no_of_exercies += elee.exercises;
                console.log(elee.id);
                return (
                  <li key={elee.id} id={elee.id}>
                    {elee.name} {elee.exercises}
                  </li>
                );
              })}
            </ul>
            <p>total no of exercises: {no_of_exercies}</p>
          </div>
        );
      })}
    </div>
  );
};
export default App;
