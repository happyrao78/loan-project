import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../api/auth";
import { useNotification } from "../hooks";

export const AuthContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};

export default function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
  const { updateNotification } = useNotification();

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setAuthInfo({ ...authInfo, isPending: true });
    const response = await signInUser({ email, password });
    // console.log("User from api", response);
    if (response.data.success === false) {
      updateNotification("error", response.data.message);
      return setAuthInfo({ ...authInfo, isPending: false});
    }
    navigate("/", { replace: true });
    setAuthInfo({
      profile: { ...response.data.user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });

    localStorage.setItem("auth-token", response.data.token);
  };

  // const isAuth = async () => {
  //   const token = localStorage.getItem("auth-token");
  //   if (!token) return;

  //   setAuthInfo({ ...authInfo, isPending: true });
  //   const { error, user } = await getIsAuth(token);
  //   if (error) {
  //     updateNotification("error", error);
  //     return setAuthInfo({ ...authInfo, isPending: false, error });
  //   }

  //   setAuthInfo({
  //     profile: { ...user },
  //     isLoggedIn: true,
  //     isPending: false,
  //     error: "",
  //   });
  // };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setAuthInfo({ ...defaultAuthInfo });
  };

  // useEffect(() => {
  //   isAuth();
  // }, []);

  //  handleLogout
  return (
    <AuthContext.Provider
      value={{ authInfo, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
