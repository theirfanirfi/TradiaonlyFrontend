// src/services/axiosInstance.js
import axios from "axios";

// Create instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const apiKey = process.env.REACT_APP_API_KEY_SECRET;
    if (apiKey) {
      config.headers["x-api-key"] = apiKey;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

    //   if (status === 401 || status === 403) {
    //     // Auto logout / redirect
    //     localStorage.removeItem("authToken");
    //     window.location.href = "/login";
    //   }

      // Optionally show toast, etc.
      console.error("API error:", error.response.data?.message || error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
