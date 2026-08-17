import { Avatar, Dropdown, DropdownItem } from "flowbite-react";
import { formatDate } from "../../../lib/formatDate";

import { HiOutlineDotsHorizontal, HiOutlineGlobeAlt } from "react-icons/hi";

import { FaRegEdit } from "react-icons/fa";

import { MdDelete } from "react-icons/md";

import useDeletePost from "../../../hooks/useDeletePost";
import ModalUpdatePost from "../ModalUpdatePost";
import { useState } from "react";
import BookmarkButton from "./Bookmark";

export default function PostHeader({ post, currentUser, isHome }) {
  const { user, createdAt, privacy, _id: postId, bookmarked } = post;

  // ================== Delete Post ==================

  const { mutate: deletePost, isPending: isDeleting } = useDeletePost({
    isHome,
  });

  const isOwner = currentUser?._id === user?._id;

  // ================== Update Post ==================

  const [openEditModal, setOpenEditModal] = useState(false);

  function handleOpenEdit() {
    setOpenEditModal(true);
  }

  function handleCloseEdit() {
    setOpenEditModal(false);
  }

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        {/* User Info */}

        <div className="flex min-w-0 flex-1 items-start gap-3">
          <Avatar img={user?.photo} rounded />

          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold">{user?.name}</h3>

            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
              <span>{formatDate(createdAt)}</span>

              <span>•</span>

              <span className="flex items-center gap-1">
                <HiOutlineGlobeAlt />

                <span className="capitalize">{privacy}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Menu */}

        <div className="flex items-center gap-1">
          <BookmarkButton postId={postId} bookmarked={bookmarked} />

          {isOwner && (
            <Dropdown
              arrowIcon={false}
              renderTrigger={() => (
                <button
                  disabled={isDeleting}
                  className="shrink-0 cursor-pointer rounded-full p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <HiOutlineDotsHorizontal size={22} />
                </button>
              )}
            >
              <DropdownItem icon={FaRegEdit} onClick={handleOpenEdit}>
                Edit
              </DropdownItem>

              <DropdownItem
                disabled={isDeleting}
                onClick={() => deletePost(postId)}
                icon={MdDelete}
                className="text-red-600"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </DropdownItem>
            </Dropdown>
          )}
        </div>
      </div>

      {/* Edit Modal */}

      <ModalUpdatePost
        post={post}
        open={openEditModal}
        onClose={handleCloseEdit}
      />
    </>
  );
}
