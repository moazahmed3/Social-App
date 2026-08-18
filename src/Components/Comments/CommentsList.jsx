import { Alert } from "flowbite-react";
import Loader from "../Loader/Loader";
import CreateComment from "./CreateComment";
import useComments from "./../../hooks/useComments";
import Comment from "./Comment/Comment";

export default function CommentsList({ id, postOwnerId }) {
  const { data: comments, isPending, isError, error } = useComments(id);

  if (isPending) {
    return (
      <div className="flex justify-center py-6">
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
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Comments
        </h2>

        <p className="text-sm text-gray-500">
          Share your thoughts about this post
        </p>
      </div>

      {/* Create Comment */}
      <div className="mb-6">
        <CreateComment postId={id} mood="create" />
      </div>

      {/* Comments */}
      <div className="flex flex-col">
        {comments?.length ? (
          comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              postOwnerId={postOwnerId}
            />
          ))
        ) : (
          <div className="rounded-lg bg-gray-50 py-8 text-center dark:bg-gray-800">
            <p className="text-sm text-gray-500">No comments yet.</p>

            <p className="mt-1 text-xs text-gray-400">
              Be the first to comment!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
