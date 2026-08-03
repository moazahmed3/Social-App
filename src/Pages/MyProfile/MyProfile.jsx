import CreatePost from "../../Components/Posts/CreatePost";
import PostsList from "../../Components/Posts/PostsList";
import CardProfile from "../../Components/Profile/CardProfile";

export default function MyProfile() {
  return (
    <section>
      {/* My Profile Content */}
      <div className="container max-w-3xl flex flex-col gap-y-8  mx-auto ">
        {/* details users */}
        <CardProfile />

        {/* create post */}
        <CreatePost />

        {/* posts list */}
        <PostsList isHome={false} />
      </div>
    </section>
  );
}
