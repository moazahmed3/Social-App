import { useQuery } from "@tanstack/react-query";
import { UsersAPI } from "../services/users";

export default function usePost(userId, options = {}) {
  return useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => UsersAPI.getUserPosts(userId),
    retry: 2,
    staleTime: 1000 * 60,
    ...options,
  });
}
