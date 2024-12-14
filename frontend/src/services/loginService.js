import axios from "axios";
const baseUrl = "http://192.168.0.109:3001/api/login";
//const baseUrl = "https://tutkibudjettia2025.fi/api/login";

//const baseUrl = "/api/login";
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
