import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL || "http://localhost:3000",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

function getCookieValue(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

axiosInstance.interceptors.request.use((config) => {
  if (["post", "put", "delete"].includes(config.method)) {
    const csrfToken = getCookieValue("csrfToken");
    if (csrfToken) {
      config.headers["x-csrf-token"] = csrfToken;
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          console.warn("Unauthorized: please login");
          break;
        case 403:
          console.warn("Forbidden: access denied or invalid CSRF token");
          break;
        case 500:
          console.error("Server Error. Please try again later.");
          break;
        default:
          console.error(`HTTP error ${status}: ${error.response.statusText}`);
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    } else {
      console.error("Network error or CORS issue", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
