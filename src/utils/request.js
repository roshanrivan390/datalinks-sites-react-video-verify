import axios from "axios";

const APP_URL = import.meta.env.VITE_API_URL;

const request = axios.create({
  baseURL: `${APP_URL}/api/v1`,
});

request.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default request;
