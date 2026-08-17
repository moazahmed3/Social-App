import { Button } from "flowbite-react";
import { FaHeart } from "react-icons/fa";
import { HiOutlineHeart, HiOutlineShare } from "react-icons/hi";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

import useToggleLike from "./../../../hooks/useToggleLike";
import Loader from "./../../Loader/Loader";
import { useState } from "react";
import CreateComment from "../../Comments/CreateComment";

export default function PostActions({ postId, isLiked }) {
  const { mutate: toggleLike, isPending: isLikePending } = useToggleLike();

  const [isCreateComment, setIsCreateComment] = useState(false);

  return (
    <>
      {/* Actions */}
      <div className="grid grid-cols-3 gap-2">
        {/* Like */}
        <Button
          onClick={() => toggleLike(postId)}
          disabled={isLikePending}
          className="cursor-pointer"
          color="light"
        >
          {isLikePending ? (
            <Loader size="md" />
          ) : isLiked ? (
            <>
              <FaHeart className="mr-2 text-lg text-red-500" />
              like
            </>
          ) : (
            <>
              <HiOutlineHeart className="mr-2 text-lg" />
              Like
            </>
          )}
        </Button>

        {/* Comment */}
        <Button
          className="cursor-pointer"
          color="light"
          onClick={() => {
            setIsCreateComment(!isCreateComment);
          }}
        >
          <HiOutlineChatBubbleOvalLeft className="mr-2 text-lg" />
          Comment
        </Button>

        {/* Share */}
        <Button className="cursor-pointer" color="light">
          <HiOutlineShare className="mr-2 text-lg" />
          Share
        </Button>
      </div>

      {/* create comment */}
      {isCreateComment && <CreateComment postId={postId} />}
    </>
  );
}
