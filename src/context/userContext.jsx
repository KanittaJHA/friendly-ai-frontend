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

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setLoading(false);
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await axiosInstance.post(
        API_PATHS.AUTH.LOGOUT,
        {},
        { withCredentials: true }
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
      const userData = res.data?.data || res.data;
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
    if (!user) fetchUser();
    else setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
