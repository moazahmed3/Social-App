import { Avatar, Dropdown, DropdownItem } from "flowbite-react";
import { formatDate } from "../../../lib/formatDate";

import {
  HiOutlineDotsHorizontal,
  HiOutlineGlobeAlt,
} from "react-icons/hi";

import { FaRegEdit, FaShareAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import useDeletePost from "../../../hooks/useDeletePost";
import ModalUpdatePost from "../ModalUpdatePost";
import { useState } from "react";

export default function PostHeader({
  post,
  currentUser,
  isHome,
}) {
  const {
    user,
    createdAt,
    privacy,
    _id: postId,
  } = post;

  // ================== Delete Post ==================

  const {
    mutate: deletePost,
    isPending,
  } = useDeletePost({
    isHome,
  });

  const isOwner =
    currentUser?._id === user?._id;

  // ================== Update Post ==================

  const [openEditModal, setOpenEditModal] =
    useState(false);

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
          <Avatar
            img={user?.photo}
            rounded
          />

          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold">
              {user?.name}
            </h3>

            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
              <span>
                {formatDate(createdAt)}
              </span>

              <span>•</span>

              <span className="flex items-center gap-1">
                <HiOutlineGlobeAlt />

                <span className="capitalize">
                  {privacy}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Menu */}

        {isOwner && (
          <Dropdown
            arrowIcon={false}
            renderTrigger={() => (
              <button
                disabled={isPending}
                className="shrink-0 cursor-pointer rounded-full p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <HiOutlineDotsHorizontal size={22} />
              </button>
            )}
          >
            <DropdownItem
              icon={FaShareAlt}
            >
              Share
            </DropdownItem>

            <DropdownItem
              icon={FaRegEdit}
              onClick={handleOpenEdit}
            >
              Edit
            </DropdownItem>

            <DropdownItem
              disabled={isPending}
              onClick={() => deletePost(postId)}
              icon={MdDelete}
              className="text-red-600"
            >
              {isPending
                ? "Deleting..."
                : "Delete"}
            </DropdownItem>
          </Dropdown>
        )}
      </div>

      {/* Modal OUTSIDE Dropdown */}

      <ModalUpdatePost
        post={post}
        open={openEditModal}
        onClose={handleCloseEdit}
      />
    </>
  );
}