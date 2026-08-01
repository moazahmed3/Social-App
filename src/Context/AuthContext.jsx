import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(0);

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      getPersonalData(token);
    }
  }, [token]);

  async function getPersonalData(token) {
    try {
      const { data } = await axios.get(
        "https://route-posts.routemisr.com/users/profile-data",
        {
          headers: { token },
        },
      );

      if (data.success) {
        setUser(data.data.user);
      }
    } catch (error) {
      console.log(error);
      logout();
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }
  function login(token) {
    localStorage.setItem("token", token);
    setToken(token);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
