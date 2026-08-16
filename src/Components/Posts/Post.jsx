import { Avatar, Button, Card, Dropdown, DropdownItem } from "flowbite-react";
import { FaRegEdit, FaShareAlt } from "react-icons/fa";
import {
  HiOutlineDotsHorizontal,
  HiOutlineGlobeAlt,
  HiOutlineHeart,
  HiOutlineShare,
} from "react-icons/hi";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Comment from "../Comments/Comment";
import { formatDate } from "../../lib/formatDate";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostsAPI } from "../../services/posts";
import { toast } from "react-toastify";

export default function Post({ post, isHome }) {
  const { user: currentUser } = useContext(AuthContext);
  const {
    body,
    image,
    privacy,
    createdAt,
    likesCount,
    commentsCount,
    sharesCount,
    bookmarked,
    user,
    _id,
    topComment,
  } = post;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: () => PostsAPI.deletePost(_id),
    onSuccess: (success) => {
      console.log(success + "success");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      toast.success("Post deleted successfully");
      // reload but where home or details
      isHome ? navigate("/") : navigate("/myProfile");
    },
    onError: (error) => {
      console.log(error.response?.data?.message || error.message);
      toast.error("Failed to delete post");
    },
  });

  return (
    <Card className="shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-1 items-start gap-3 min-w-0">
          <Avatar img={user?.photo} rounded />

          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold">{user?.name}</h3>

            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
              <span className="truncate">@{user?.username}</span>

              <span>•</span>

              <span>{formatDate(createdAt)}</span>

              <span>•</span>

              <span className="flex items-center gap-1">
                <HiOutlineGlobeAlt />
                <span className="capitalize">{privacy}</span>
              </span>
            </div>
          </div>
        </div>

        {currentUser._id === user._id && (
          <Dropdown
            arrowIcon={false}
            renderTrigger={() => (
              <button className="shrink-0 rounded-full p-2 transition hover:bg-gray-100">
                <HiOutlineDotsHorizontal size={22} />
              </button>
            )}
          >
            <DropdownItem icon={FaShareAlt}>Share</DropdownItem>

            <DropdownItem icon={FaRegEdit}>Edit</DropdownItem>

            <DropdownItem
              onClick={mutate}
              icon={MdDelete}
              className="text-red-600"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        )}
      </div>

      {/* navigate to post details */}

      {isHome ? (
        <>
          <Link to={`/posts/${_id}`}>
            {/* Body */}
            {body && (
              <p className="text-gray-700 whitespace-pre-line text-lg mb-3">
                {body}
              </p>
            )}

            {/* Image */}
            {image && (
              <img
                src={image}
                alt="Post"
                className="rounded-xl w-full max-h-137.5 object-cover"
              />
            )}
          </Link>
        </>
      ) : (
        <>
          {/* Body */}
          {body && (
            <p className="text-gray-700 whitespace-pre-line text-lg mb-3">
              {body}
            </p>
          )}

          {/* Image */}
          {image && (
            <img
              src={image}
              alt="Post"
              className="rounded-xl w-full max-h-137.5 object-cover"
            />
          )}
        </>
      )}

      {/* Bookmark */}
      {bookmarked && (
        <span className="text-blue-600 text-sm font-medium">📌 Bookmarked</span>
      )}

      {/* Stats */}
      <div className="flex justify-between text-sm text-gray-500 border-b pb-3">
        <span>❤️ {likesCount} Likes</span>

        <div className="flex gap-4">
          <span>{commentsCount} Comments</span>

          <span>{sharesCount} Shares</span>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-3 gap-2">
        <Button className="cursor-pointer" color="light">
          <HiOutlineHeart className="mr-2 text-lg" />
          Like
        </Button>

        <Button className="cursor-pointer" color="light">
          <HiOutlineChatBubbleOvalLeft className="mr-2 text-lg" />
          Comment
        </Button>

        <Button className="cursor-pointer" color="light">
          <HiOutlineShare className="mr-2 text-lg" />
          Share
        </Button>
      </div>
      {/* Top Comment one comment */}
      {topComment && isHome && <Comment comment={topComment} />}
    </Card>
  );
}
