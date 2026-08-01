import { useParams } from "react-router-dom";
import Post from "../../Components/Posts/Post";
import { PostsAPI } from "../../services/posts";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { CommentsAPI } from "../../services/comments";
import Comment from "../../Components/Comments/Comment";

export default function PostDetails() {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorApi, setErrorApi] = useState(null);
  const { id } = useParams();

  async function fetchPostData() {
    try {
      setLoading(true);

      const [postResponse, commentsResponse] = await Promise.all([
        PostsAPI.fetchPostDetails(id),
        CommentsAPI.getComments(id),
      ]);

      if (postResponse.success) {
        setPost(postResponse.data.post);
      }

      if (commentsResponse.success) {
        setComments(commentsResponse.data.comments);
      }

      setErrorApi(null);
    } catch (error) {
      console.error(error);

      setErrorApi(
        error.response?.data?.message ||
          "An error occurred while fetching data.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    fetchPostData();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (errorApi) {
    return (
      <Alert color="failure" icon={HiInformationCircle}>
        {errorApi}
      </Alert>
    );
  }

  return (
    <section>
      <div className="container max-w-3xl flex flex-col gap-y-8  mx-auto">
        <Post post={post} isDetails={true} />

        {/* comments */}
        <div className="flex flex-col gap-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))
          ) : (
            <p className="text-gray-500 text-center">No comments yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
