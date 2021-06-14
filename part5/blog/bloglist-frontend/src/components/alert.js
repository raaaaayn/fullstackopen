import React from "react";

const Alert = ({ alert }) => {
  if (alert === null) {
    return <div></div>;
  }
  return <div className="alert">{alert}</div>;
};

export default Alert;
