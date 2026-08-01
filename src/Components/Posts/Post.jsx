import {
  Avatar,
  Button,
  Card,
  Dropdown,
  DropdownDivider,
  DropdownItem,
} from "flowbite-react";
import { FaRegEdit, FaShareAlt } from "react-icons/fa";
import {
  HiLogout,
  HiOutlineDotsHorizontal,
  HiOutlineGlobeAlt,
  HiOutlineHeart,
  HiOutlineShare,
} from "react-icons/hi";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Comment from "../Comments/Comment";
import { formatDate } from "../../lib/formatDate";

export default function Post({ post, isDetails = false }) {
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
  console.log(topComment);
  return (
    <Card className="shadow-md">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <Avatar img={user?.photo} rounded />

          <div>
            <h3 className="font-semibold text-lg">{user?.name}</h3>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>@{user?.username}</span>

              <span>•</span>

              <span>{formatDate(createdAt)}</span>

              <span>•</span>

              <HiOutlineGlobeAlt />

              <span className="capitalize">{privacy}</span>
            </div>
          </div>
        </div>

        <Dropdown
          arrowIcon={false}
          renderTrigger={() => (
            <button className="cursor-pointer rounded-full p-2 hover:bg-gray-100 transition">
              <HiOutlineDotsHorizontal size={22} />
            </button>
          )}
        >
          <DropdownItem icon={FaShareAlt}>Share</DropdownItem>

          <DropdownItem icon={FaRegEdit}>Edit</DropdownItem>

          <DropdownItem icon={MdDelete} className="text-red-600">
            Delete
          </DropdownItem>

          <DropdownDivider />

          <DropdownItem icon={HiLogout}>Logout</DropdownItem>
        </Dropdown>
      </div>

      {/* navigate to post details */}

      {!isDetails ? (
        <>
          <Link to={`posts/${_id}`}>
            {/* Body */}
            {body && (
              <p className="text-gray-700 whitespace-pre-line text-lg">
                {body}
              </p>
            )}

            {/* Image */}
            {image && (
              <img
                src={image}
                alt="Post"
                className="rounded-xl w-full max-h-[137.5]] object-cover"
              />
            )}
          </Link>
        </>
      ) : (
        <>
          {/* Body */}
          {body && (
            <p className="text-gray-700 whitespace-pre-line text-lg">{body}</p>
          )}

          {/* Image */}
          {image && (
            <img
              src={image}
              alt="Post"
              className="rounded-xl w-full max-h-[137.5]] object-cover"
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

      {topComment && !isDetails && <Comment comment={topComment} />}
    </Card>
  );
}
