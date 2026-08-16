import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UsersAPI } from "../services/users";

export default function useChangePassword() {
  return useMutation({
    mutationFn: (data) => UsersAPI.changePassword(data),

    onSuccess: () => {
      toast.success("Password changed successfully");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
}
