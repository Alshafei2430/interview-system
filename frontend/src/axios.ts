import axios, { AxiosRequestConfig } from "axios";
console.log("baseurl", import.meta.env.API_URL);
const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

export default axios.create(config);
