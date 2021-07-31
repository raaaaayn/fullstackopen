import { useEffect, useState } from "react";
import axios from "axios";

export const useCountry = (fullName) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${fullName}?fullText=true`)
      .then((result) => {
        setCountry({ data: result.data[0], found: true });
      })
      .catch((err) => {
        if (err.toJSON().message === "Request failed with status code 404")
          setCountry({ found: false });
        else {
          setCountry(null);
        }
      });
  }, [fullName]);
  return country;
};
