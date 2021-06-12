import PropTypes from "prop-types";
import React from "react";

const Alert = ({ alert }) => {
  if (alert === null) {
    return <div></div>;
  }
  return <div className="alert">{alert}</div>;
};

Alert.propTypes = {
  alert: PropTypes.string.isRequired,
};

export default Alert;
