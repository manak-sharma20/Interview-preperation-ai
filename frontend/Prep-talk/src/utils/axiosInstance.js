import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "/api",
  timeout: 80000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add JWT token to requests
API.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server Error: ", error.response.data);
      }
    } else if (error.code === "ECONNABORTED") {
      console.log("Request Timeout");
    }

    return Promise.reject(error);
  }
);

export default API;
