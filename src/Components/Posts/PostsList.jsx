import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import usePosts from "../../hooks/usePosts";
import usePost from "../../hooks/usePost";
import Post from "./Post/Post";
import ScreenLoader from "../Loader/ScreenLoader";
import { Link } from "react-router-dom";

export default function PostsList({ isHome }) {
  const { user } = useContext(AuthContext);

  const postsQuery = usePosts({
    enabled: isHome,
  });
  const userPostsQuery = usePost(user?._id, {
    enabled: !isHome && !!user?._id,
  });
  // isHome is true, then use postsQuery, else use userPostsQuery
  const { data, isPending, isError, error } = isHome
    ? postsQuery
    : userPostsQuery;

  // loading state
  if (isPending) return <ScreenLoader />;

  // error state
  if (isError) {
    return (
      <Alert
        className="flex justify-center h-screen"
        color="failure"
        icon={HiInformationCircle}
      >
        {error.response?.data?.message || error.message}
        <Link to={"/"}> Home </Link>
      </Alert>
    );
  }
  // show posts
  return (
    <div className="flex flex-col gap-y-8">
      {data.data?.posts?.map((post) => (
        <Post key={post._id} post={post} isHome={isHome} />
      ))}
    </div>
  );
}
