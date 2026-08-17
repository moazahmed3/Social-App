import { Alert } from "flowbite-react";
import Comment from "./Comment";
import Loader from "../Loader/Loader";
import useComments from "../../hooks/useComments";

export default function CommentsList({ id }) {
  const { data: comments, isPending, isError, error } = useComments(id);

  if (isPending) {
    return (
      <div className="flex justify-center py-4">
        <Loader size="sm" />
      </div>
    );
  }

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
