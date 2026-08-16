import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PostsAPI } from "../../../services/posts";
import { toast } from "react-toastify";
import { Avatar, Dropdown, DropdownItem } from "flowbite-react";
import { formatDate } from "../../../lib/formatDate";
import { HiOutlineDotsHorizontal, HiOutlineGlobeAlt } from "react-icons/hi";
import { FaRegEdit, FaShareAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function PostHeader({
  user,
  createdAt,
  privacy,
  postId,
  currentUser,
  isHome,
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deletePost } = useMutation({
    mutationFn: () => PostsAPI.deletePost(postId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["userPosts"],
      });

      toast.success("Post deleted successfully");

      isHome ? navigate("/") : navigate("/myProfile");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete post");
    },
  });

  const isOwner = currentUser?._id === user?._id;

  return (
    <div className="flex items-start justify-between gap-3">
      {/* User Info */}
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <Avatar img={user?.photo} rounded />

        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold">{user?.name}</h3>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
            {/* <span className="truncate">@{user?.username}</span> */}

            {/* <span>•</span> */}

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
      {isOwner && (
        <Dropdown
          arrowIcon={false}
          renderTrigger={() => (
            <button className="shrink-0 cursor-pointer rounded-full p-2 transition hover:bg-gray-100">
              <HiOutlineDotsHorizontal size={22} />
            </button>
          )}
        >
          <DropdownItem icon={FaShareAlt}>Share</DropdownItem>

          <DropdownItem icon={FaRegEdit}>Edit</DropdownItem>

          <DropdownItem
            onClick={() => deletePost()}
            icon={MdDelete}
            className="text-red-600"
          >
            Delete
          </DropdownItem>
        </Dropdown>
      )}
    </div>
  );
}
