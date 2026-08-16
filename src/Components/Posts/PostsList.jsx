import Post from "./Post";
import Loader from "./../Loader/Loader";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import usePosts from "../../hooks/usePosts";
import usePost from "../../hooks/usePost";

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
  if (isPending) return <Loader />;

  // error state
  if (isError) {
    return (
      <Alert color="failure" icon={HiInformationCircle}>
        {error.response?.data?.message || error.message}
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
