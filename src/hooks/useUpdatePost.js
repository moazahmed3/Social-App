import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { PostsAPI } from "../services/posts";

export default function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, formData }) => PostsAPI.updatePost(postId, formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["userPosts"],
      });

      toast.success("Post updated successfully");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update post");
    },
  });
}
