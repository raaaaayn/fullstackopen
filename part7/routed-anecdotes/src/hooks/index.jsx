import { useState } from "react";

export const useField = (name) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return {
    name,
    value,
    onChange,
  };
};

// export const useFieldAuthor = (name) => {
//   const [value, setValue] = useState("");

//   const onChange = (e) => {
//     setValue(e.target.value);
//   };

//   return {
//     name,
//     value,
//     onChange,
//   };
// }

// export const useFieldInfo = (name) => {
//   const [value, setValue] = useState("");

//   const onChange = (e) => {
//     setValue(e.target.value);
//   };

//   return {
//     name,
//     value,
//     onChange,
//   };
// }
