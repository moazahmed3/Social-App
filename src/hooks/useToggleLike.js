import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostsAPI } from "../services/posts";
import { toast } from "react-toastify";


export default function useToggleLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId) => PostsAPI.toggleLike(postId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["userPosts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["post"],
      });

    },

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
}
