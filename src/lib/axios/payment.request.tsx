import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

const axiosInstance3 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_PAYMENT,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": "true",
    // "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    // Accept: "*/*",
    // "Content-Type": "application/x-www-form-urlencoded",
  },
});

axiosInstance3.interceptors.request.use(
  function (req) {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance3.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    if (error.response) return Promise.reject(error.response);
    return null;
  }
);

export default axiosInstance3;
