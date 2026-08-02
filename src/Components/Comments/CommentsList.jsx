import { useQuery } from "@tanstack/react-query";
import { CommentsAPI } from "../../services/comments";
import { Alert } from "flowbite-react";
import Loader from "../Loader/Loader";
import Comment from "./Comment";

export default function CommentsList({ id }) {
  const {
    data: comments,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => CommentsAPI.getComments(id),
    enabled: !!id,
    retry: 2,
    staleTime: 1000 * 60,
    select: (response) => response.data.comments,
  });

  if (isPending) return <Loader />;

  if (isError) {
    return (
      <Alert color="failure">
        {error.response?.data?.message || error.message}
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      {comments?.length ? (
        comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))
      ) : (
        <p className="text-center text-gray-500">No comments yet.</p>
      )}
    </div>
  );
}
