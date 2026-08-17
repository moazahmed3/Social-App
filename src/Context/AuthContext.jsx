import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UsersAPI } from "../services/users";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: UsersAPI.getProfile,
    enabled: !!token,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  const user = data?.data?.user ?? null;

  function login(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isError,
        error,
        isLoadingUser: isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
