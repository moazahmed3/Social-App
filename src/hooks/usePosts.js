import { useQuery } from "@tanstack/react-query";
import { PostsAPI } from "../services/posts";

export default function usePosts({options={}}) {
  return useQuery({
    queryKey: ["posts"],
    queryFn: PostsAPI.fetchAllPosts,
    retry: 2,
    staleTime: 1000 * 60,
    ...options
  });
}
