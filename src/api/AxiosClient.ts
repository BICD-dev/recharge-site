import axios from "axios";
import { toast } from "react-hot-toast";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// REQUEST INTERCEPTOR
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers?.set?.("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    // CASE 1: Backend sends 401 Unauthorized
    if (status === 401) {
      if(window.location.pathname !== '/login') {
        toast.error("Session expired. Please log in again.");
      localStorage.removeItem("token");
      window.location.href = "/login";
      } 

    }

    // CASE 2: Backend sends custom message like "Token expired"
    if (message?.toLowerCase().includes("expired")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
