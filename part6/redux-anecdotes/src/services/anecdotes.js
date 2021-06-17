import axios from "axios";
const baseurl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const req = await axios.get(baseurl);
  return req.data;
};

const createAnec = async (anec) => {
  const req = await axios.post(baseurl, anec);
  return req.data;
};

export default { getAll, createAnec };
