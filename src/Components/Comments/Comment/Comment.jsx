import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import useToggleLikeComment from "../../../hooks/useToggleLikeComment";
import useDeleteComment from "./../../../hooks/useDeleteComment";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownItem,
} from "flowbite-react";
import Loader from "../../Loader/Loader";
import { FaHeart, FaRegComment, FaRegEdit } from "react-icons/fa";
import { HiOutlineDotsHorizontal, HiOutlineHeart } from "react-icons/hi";
import CreateComment from "../CreateComment";
import { formatDate } from "../../../lib/formatDate";
import { MdDelete } from "react-icons/md";

export default function Comment({ comment, postOwnerId }) {
  const { user: currentUser } = useContext(AuthContext);
  const { mutate: toggleLike, isPending: isLikePending } =
    useToggleLikeComment();

  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const {
    commentCreator,
    content,
    createdAt,
    post: postId,
    _id: commentId,
    likes,
  } = comment;

  const { name, photo, _id: commentCreatorId } = commentCreator;

  const isCommentOwner = currentUser?._id === commentCreatorId;
  const isPostOwner = currentUser?._id === postOwnerId;

  const canDelete = isCommentOwner || isPostOwner;

  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();
  const isLiked = likes?.includes(currentUser?._id);

  return (
    <div className="border-b border-gray-200 py-5 last:border-b-0 dark:border-gray-700">
      {/* ================= COMMENT ================= */}
      <div className="flex gap-3">
        {/* Avatar */}
        <Avatar img={photo} rounded size="sm" />

        {/* Comment Content */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {name}
              </h3>

              <span className="text-xs text-gray-500">
                {formatDate(createdAt)}
              </span>
            </div>

            {/* Actions Dropdown */}
            {canDelete && (
              <Dropdown
                arrowIcon={false}
                placement="bottom-end"
                renderTrigger={() => (
                  <button
                    disabled={isDeleting}
                    className="rounded-full p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <HiOutlineDotsHorizontal size={19} />
                  </button>
                )}
              >
                {/* Edit */}
                {isCommentOwner && (
                  <DropdownItem
                    onClick={() => setIsOpenUpdate(!isOpenUpdate)}
                    icon={FaRegEdit}
                  >
                    Edit
                  </DropdownItem>
                )}

                {isCommentOwner && <DropdownDivider />}

                {/* Delete */}
                <DropdownItem
                  disabled={isDeleting}
                  onClick={() =>
                    deleteComment({
                      postId,
                      commentId,
                    })
                  }
                  icon={MdDelete}
                  className="text-red-600"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </DropdownItem>
              </Dropdown>
            )}
          </div>

          {/* ================= CONTENT ================= */}
          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-700 dark:text-gray-300">
            {content}
          </p>

          {/* ================= COMMENT ACTIONS ================= */}
          <div className="mt-3 flex items-center gap-5">
            {/* Like */}
            <button
              disabled={isLikePending}
              onClick={() => {
                toggleLike({ postId, commentId });
              }}
              type="button"
              className="flex items-center cursor-pointer gap-1.5 text-xs font-medium text-gray-500 transition hover:text-red-500"
            >
              {isLikePending ? (
                <Loader size="md" />
              ) : isLiked ? (
                <>
                  <FaHeart size={17} className="text-red-500" />
                  like
                </>
              ) : (
                <>
                  <HiOutlineHeart size={17} />
                  Like
                </>
              )}
            </button>

            {/* Reply */}
            <button
              type="button"
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 transition hover:text-blue-600"
            >
              <FaRegComment size={15} />

              <span>Reply</span>
            </button>
          </div>

          {/* ================= UPDATE COMMENT ================= */}
          {isOpenUpdate && (
            <div className="mt-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
              <CreateComment
                postId={postId}
                mood="update"
                commentId={commentId}
              />
            </div>
          )}

          {/* ================= REPLY INPUT ================= */}
          {isReplying && (
            <div className="mt-4 ml-2 border-l-2 border-gray-200 pl-4 dark:border-gray-700">
              <CreateComment
                postId={postId}
                mood="reply"
                commentId={commentId}
              />
            </div>
          )}

          {/* ================= REPLIES ================= */}
          {showReplies && (
            <div className="mt-4 ml-2 border-l-2 border-gray-200 pl-4 dark:border-gray-700">
              {/* 
                هنا هنحط Get Comment Replies

                <CommentReplies
                  commentId={commentId}
                />
              */}

              <div className="text-sm text-gray-500">
                Replies will appear here...
              </div>
            </div>
          )}

          {/* ================= VIEW REPLIES ================= */}
          <button
            type="button"
            onClick={() => setShowReplies(!showReplies)}
            className="mt-4 text-xs font-semibold text-blue-600 hover:underline"
          >
            {showReplies ? "Hide replies" : "View replies"}
          </button>
        </div>
      </div>
    </div>
  );
}
