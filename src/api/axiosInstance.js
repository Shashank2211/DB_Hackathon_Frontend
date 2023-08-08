import axios, { InternalAxiosRequestConfig } from "axios";
import { BACKEND_URL } from "../config";
import { getStorage } from "utils/Storage";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// timeout for all requests
axiosInstance.defaults.timeout = 3000;

const interceptors = (config) => {
  const token = getStorage("token");
  if (config.headers) {
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
  }
  return config;
};
axiosInstance.interceptors.request.use(interceptors);

export default axiosInstance;
