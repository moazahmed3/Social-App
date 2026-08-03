import { Card } from "flowbite-react";
export default function CardStats({ user }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <Card className="text-center">
        <p className="text-3xl font-bold">{user.followersCount}</p>
        <p className="text-gray-500">Followers</p>
      </Card>

      <Card className="text-center">
        <p className="text-3xl font-bold">{user.followingCount}</p>
        <p className="text-gray-500">Following</p>
      </Card>

      <Card className="text-center">
        <p className="text-3xl font-bold">{user.bookmarksCount}</p>
        <p className="text-gray-500">Bookmarks</p>
      </Card>
    </div>
  );
}
