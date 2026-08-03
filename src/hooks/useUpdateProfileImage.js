import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UsersAPI } from "../services/users";
import { toast } from "react-toastify";

export default function useUpdateProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UsersAPI.uploadProfileImg,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      toast.success("Profile updated");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
}
