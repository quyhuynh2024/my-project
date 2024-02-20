import axios from "axios";

const api = axios.create({
  // withCredentials: true, // cookie based
  baseURL: "http://localhost:5000/api/v1",
});

export default api;
