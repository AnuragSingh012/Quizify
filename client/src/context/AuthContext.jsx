import { useContext, createContext, useEffect, useState } from "react";
import {
  checkAuthStatus,
  loginUser,
  signupUser,
} from "../helpers/api-communicator";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      const data = await checkAuthStatus();
      if (data) {
        setUser({ username: data.username, email: data.email });
        setIsLoggedIn(true);
      }
    };
    checkStatus();
  }, []);
  const login = async (username, password) => {
    const data = await loginUser(username, password);
    if (data) {
      setUser({ username: data.username, email: data.email });
      setIsLoggedIn(true);
    }
  };
  const signup = async (username, email, password) => {
    const data = await signupUser(username, email, password);
    if (data) {
      setUser({ username: data.username, email: data.email });
      setIsLoggedIn(true);
    }
  };
  const logout = async () => {};

  const value = {
    user,
    isLoggedIn,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
