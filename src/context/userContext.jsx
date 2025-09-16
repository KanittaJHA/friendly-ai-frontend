import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  const getCsrfToken = () => {
    const name = "csrfToken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i].trim();
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setLoading(false);
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      const csrfToken = getCsrfToken();
      await axiosInstance.post(
        API_PATHS.AUTH.LOGOUT,
        {},
        {
          headers: csrfToken ? { "x-csrf-token": csrfToken } : {},
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(API_PATHS.AUTH.GET_ME, {
        withCredentials: true,
      });
      const userData = res.data.data || res.data;
      if (userData) {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    } catch (err) {
      console.error("Fetch user failed:", err);
      setUser(null);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoading(false);
    } else {
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
