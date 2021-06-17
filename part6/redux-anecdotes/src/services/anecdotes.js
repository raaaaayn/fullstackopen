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

const vote = async (anec) => {
  await axios.put(`${baseurl}/${anec.id}`, {
    ...anec,
    votes: anec.votes + 1,
  });
};

export default { getAll, createAnec, vote };
