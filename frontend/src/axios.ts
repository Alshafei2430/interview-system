import axios, { AxiosRequestConfig } from "axios";
const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

export default axios.create(config);
