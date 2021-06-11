import React from "react";

const Notif = ({ notif }) => {
  if (notif === null) {
    return <div></div>;
  }
  return <div className="success">{notif}</div>;
};

export default Notif;
