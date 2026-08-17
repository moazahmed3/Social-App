import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CommentsAPI } from "../services/comments";

export default function useCreateComment(postId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content) => CommentsAPI.createComment(content, postId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", postId],
      });

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["post", postId],
      });

      toast.success("Comment added successfully");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to add comment",
      );
    },
  });
}
