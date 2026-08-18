import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentsAPI } from "../services/comments";
import { toast } from "react-toastify";

export default function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, commentId }) =>
      CommentsAPI.deleteComment(postId, commentId),
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

      toast.success("Comment deleted successfully");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete comment",
      );
    },
  });
}
