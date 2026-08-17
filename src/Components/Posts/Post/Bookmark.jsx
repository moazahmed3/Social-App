import { Button } from "flowbite-react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import useToggleBookmark from "../../../hooks/useToggleBookmark";
import Loader from "../../Loader/Loader";

export default function BookmarkButton({ postId, bookmarked }) {
  const { mutate: toggleBookmark, isPending } = useToggleBookmark();

  return (
    <Button
      color="light"
      size="sm"
      disabled={isPending}
      onClick={() => toggleBookmark(postId)}
      className="cursor-pointer  rounded-full"
    >
      {isPending ? (
        <Loader size="sm" />
      ) : bookmarked ? (
        <FaBookmark className="text-amber-500" />
      ) : (
        <FaRegBookmark className="text-gray-500" />
      )}
    </Button>
  );
}
