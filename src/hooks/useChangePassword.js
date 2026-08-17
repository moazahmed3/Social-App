import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UsersAPI } from "../services/users";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function useChangePassword() {
  const { login } = useContext(AuthContext);
  return useMutation({
    mutationFn: (data) => UsersAPI.changePassword(data),

    onSuccess: (data) => {
      toast.success("Password changed successfully");
      login(data.data.token);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
}
