import { useQuery } from "@tanstack/react-query";
import { CommentsAPI } from './../services/comments';


export default function useComments(postId) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => CommentsAPI.getComments(postId),
    enabled: !!postId,
    retry: 2,
    staleTime: 1000 * 60,
    select: (response) => response.data.comments,
  });
}
