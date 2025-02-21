import { useContext, createContext, useEffect, useState } from "react";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
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
        setUser({ id: data.id, username: data.username, email: data.email });
        setIsLoggedIn(true);
      }
    };
    checkStatus();
  }, []);
  const login = async (username, password) => {
    const data = await loginUser(username, password);
    if (data) {
      console.log("data=", data);
      setUser({ id: data.id, username: data.username, email: data.email });
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

  const logout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload();
  };

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
