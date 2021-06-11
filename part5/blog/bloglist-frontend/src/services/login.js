import axios from "axios";
const baseUrl = "/api/login";

const login = async (userObj) => {
  try {
    const request = await axios.post(baseUrl, userObj);
    return request.data;
  } catch {
    console.log("couldnt login");
    return null;
  }
};

export default { login };
