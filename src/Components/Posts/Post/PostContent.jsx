import { Link } from "react-router-dom";

export default function PostContent({ body, image, postId }) {
  const content = (
    <>
      {body && (
        <p className="mb-3 whitespace-pre-line text-lg text-gray-700">{body}</p>
      )}

      {image && (
        <img
          src={image}
          alt="Post"
          className="max-h-137.5 w-full rounded-xl object-cover"
        />
      )}
    </>
  );

  return <Link to={`/posts/${postId}`}>{content}</Link>;
}
