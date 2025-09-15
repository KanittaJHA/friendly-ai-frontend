import axios from "axios";
import { BASE_URL } from "./apiPaths";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const csrfToken = getCookie("csrfToken");
    if (csrfToken) {
      config.headers["x-csrf-token"] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 401:
          console.warn("Unauthorized: redirecting to login");
          window.location.href = "/signin";
          break;
        case 403:
          console.warn("Forbidden: access denied");
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
