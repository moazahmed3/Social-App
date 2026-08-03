import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader/Loader";
import { UsersAPI } from "../services/users";
import ValidationError from "../Components/Shared/ValidationError/ValidationError";

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

  if (token && isPending) {
    return <Loader />;
  }

  if (token && isError) {
    return (
      <ValidationError error={error.response?.data?.message || error.message} />
    );
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isLoadingUser: isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
