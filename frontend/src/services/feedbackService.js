import axios from "axios";

const baseUrl = "http://192.168.0.109:3001/api/palaute";

const addFeedback = (newFeedback) => {
  const request = axios.post(baseUrl, newFeedback);
  console.log("täällä");
  return request.then((response) => response.data);
};

const getAllFeedback = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { addFeedback, getAllFeedback };
