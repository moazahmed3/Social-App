import CreatePost from "../../Components/Posts/CreatePost";
import PostsList from "../../Components/Posts/PostsList";

export default function FeedPage() {
  return (
    <section>
      <div className="container max-w-3xl flex flex-col gap-y-8  mx-auto ">
        <CreatePost />
        <PostsList />
      </div>
    </section>
  );
}
