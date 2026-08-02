import Post from "./Post";
import Loader from "./../Loader/Loader";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { PostsAPI } from "../../services/posts";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function PostsList({ isHome = false }) {
  const { user } = useContext(AuthContext);

  const { data, isPending, isError, error } = useQuery({
    queryKey: isHome ? ["posts"] : ["userPosts"],
    queryFn: isHome
      ? PostsAPI.fetchAllPosts
      : () => PostsAPI.getPostsUser(user?._id),
    retry: 2,
    staleTime: 1000 * 60,
    enabled: isHome || !!user?._id,
  });

  if (isPending) return <Loader />;

  if (isError) {
    return (
      <Alert color="failure" icon={HiInformationCircle}>
        {error.response?.data?.message || error.message}
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-y-8">
      {data.data?.posts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
