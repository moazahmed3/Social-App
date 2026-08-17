import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { Card } from "flowbite-react";

import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostStats from "./PostStats";
import PostActions from "./PostActions";
import Comment from "../../Comments/Comment";

export default function Post({ post, isHome }) {
  const { user: currentUser } = useContext(AuthContext);

  const {
    body,
    image,
    likes,
    likesCount,
    commentsCount,
    sharesCount,
    _id,
    topComment,
  } = post;

  const isLiked = likes?.includes(currentUser?._id);

  return (
    <Card className="shadow-md relative">
      {/* Header */}
      <PostHeader post={post} currentUser={currentUser} isHome={isHome} />

      {/* Content */}
      <PostContent body={body} image={image} postId={_id} />

      {/* Stats */}
      <PostStats
        likesCount={likesCount}
        commentsCount={commentsCount}
        sharesCount={sharesCount}
      />

      {/* Actions */}
      <PostActions postId={_id} isLiked={isLiked} />

      {/* Top Comment */}
      {topComment && isHome && <Comment comment={topComment} />}


      
    </Card>
  );
}
