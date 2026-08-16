import { FaHeart } from "react-icons/fa";

export default function PostStats({ likesCount, commentsCount, sharesCount }) {
  return (
    <div className="flex justify-between border-b pb-3 text-sm text-gray-500">
      <span className="flex items-center">
        <FaHeart className="mr-2 text-lg text-red-500" />
        {likesCount} {likesCount === 1 ? "Like" : "Likes"}
      </span>

      <div className="flex gap-4">
        <span>
          {commentsCount} {commentsCount === 1 ? "Comment" : "Comments"}
        </span>

        <span>
          {sharesCount} {sharesCount === 1 ? "Share" : "Shares"}
        </span>
      </div>
    </div>
  );
}
