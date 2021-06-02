import axios from "axios";
const baseurl = "http://localhost:5000/api/persons";

const getPersons = () => {
  const request = axios.get(baseurl);
  return request.then((response) => response.data);
};

const createPerson = (personObj) => {
  const request = axios.post(baseurl, personObj);
  return request.then((response) => response.data);
};

const editNumber = (id, changedPerson) => {
  const request = axios.put(`${baseurl}/${id}`, changedPerson);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(baseurl + "/" + id);
  return request.then((response) => response);
};

export default {
  getPersons,
  createPerson,
  editNumber,
  deletePerson,
};
