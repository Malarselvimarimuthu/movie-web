// src/utils/axiosInstance.ts

import axios, { AxiosInstance } from 'axios';

// Create an axios instance with the base URL
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/', // The common base URL
});

export default axiosInstance;
