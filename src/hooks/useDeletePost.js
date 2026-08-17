import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PostsAPI } from "../services/posts";

export default function useDeletePost({ isHome }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (postId) => PostsAPI.deletePost(postId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["userPosts"],
      });

      toast.success("Post deleted successfully");

      navigate(isHome ? "/" : "/myProfile");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete post");
    },
  });
}
