import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const postBlog = async (blogObj) => {
  try {
    const config = { headers: { Authorization: token } };
    const request = await axios.post(baseUrl, blogObj, config);
    return request.data;
  } catch (error) {
    return null;
  }
};

const postLike = async (blogid) => {
  try {
    const result = await axios.put(`${baseUrl}/${blogid}`);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteBlog = async (blogid) => {
  const config = { headers: { Authorization: token } };
  return await axios.delete(`${baseUrl}/${blogid}`, config);
};

export default { getAll, setToken, postBlog, postLike, deleteBlog };
