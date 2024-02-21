import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

// config
const conf: AxiosRequestConfig = {
  // withCredentials: true, // cookie based
  baseURL: process.env.BASE_URL, // from webpack config
};

const api: AxiosInstance = axios.create(conf);

/* token based */
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = JSON.parse(localStorage.getItem("tokens"));
  config.headers.Authorization = `Bearer ${token?.accessToken}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
  }
);

export default api;
