import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CommentsAPI } from "../services/comments";

export default function useToggleLikeComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, commentId }) =>
      CommentsAPI.toggleLike(postId, commentId),

    onSuccess: (_, variables) => {
      console.log(variables);

      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["post", variables.postId],
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
}
