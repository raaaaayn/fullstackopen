import React from "react";

const Course = ({ courses }) => {
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

export default Course;
