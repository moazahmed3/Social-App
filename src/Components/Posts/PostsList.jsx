import Post from "./Post";
import { useEffect, useState } from "react";
import Loader from "./../Loader/Loader";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { PostsAPI } from "../../services/posts";

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorApi, setErrorApi] = useState("");

  async function getPosts() {
    try {
      setLoading(true);
      const data = await PostsAPI.fetchAllPosts();
      if (data.success) {
        setPosts(data.data.posts);
        setErrorApi("");
      } else {
        setPosts([]);
        setErrorApi(data.message);
      }
    } catch (error) {
      setPosts([]);
      setErrorApi(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (loading) return <Loader />;

  if (errorApi) {
    return (
      <Alert color="failure" icon={HiInformationCircle}>
        {errorApi}
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-y-8">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
