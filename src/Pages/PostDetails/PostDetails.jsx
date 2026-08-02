import { useParams } from "react-router-dom";
import Post from "../../Components/Posts/Post";
import { PostsAPI } from "../../services/posts";
import { useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import CommentsList from "../../Components/Comments/CommentsList";

export default function PostDetails() {
  const { id } = useParams();

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => PostsAPI.fetchPostDetails(id),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    enabled: !!id,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Alert color="failure" icon={HiInformationCircle}>
        {error.response?.data?.message || error.message}
      </Alert>
    );
  }

  return (
    <section>
      <div className="container max-w-3xl flex flex-col gap-y-8  mx-auto">
        <Post post={data.data.post} isDetails={true} />

        <CommentsList id={id} />
      </div>
    </section>
  );
}
