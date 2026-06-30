import axios from "axios";

// Base URL for API
const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "http://localhost:5000/api",
});

// Automatically attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Handle common response errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized request. Please log in again.");
      // Optional:
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;