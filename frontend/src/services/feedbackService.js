import axios from "axios";

//const baseUrl = "http://192.168.0.109:3001/api/palaute";
const baseUrl = "/api/palaute";
//const baseUrl = "https://tutkibudjettia2025.fi/api/palaute";

const addFeedback = (newFeedback) => {
  const request = axios.post(baseUrl, newFeedback);
  console.log("täällä");
  return request.then((response) => {
    console.log("Vastaus:", response.data);
  });
};

const getAllFeedback = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { addFeedback, getAllFeedback };
