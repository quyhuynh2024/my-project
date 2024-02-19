import axios from "axios";

const api = axios.create({
  withCredentials: true, // cookie based
  //   baseURL: "https://yourdomain.com/api/v1",
});

export default api;
