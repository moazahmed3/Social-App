import { Card } from "flowbite-react";
import { HiCalendar, HiMail, HiUser, HiUsers } from "react-icons/hi";
import { formatDate } from "../../lib/formatDate";

export default function CardAbout({ user }) {
  return (
    <Card>
      <h2 className="mb-6 text-2xl font-bold">About</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex items-center gap-3">
          <HiMail className="text-xl text-blue-600" />

          <div>
            <p className="text-sm text-gray-500">Email</p>

            <p>{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <HiUser className="text-xl text-blue-600" />

          <div>
            <p className="text-sm text-gray-500">Gender</p>

            <p>{user.gender}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <HiCalendar className="text-xl text-blue-600" />

          <div>
            <p className="text-sm text-gray-500">Birthday</p>

            <p>{formatDate(user.dateOfBirth)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <HiUsers className="text-xl text-blue-600" />

          <div>
            <p className="text-sm text-gray-500">Joined</p>

            <p>{formatDate(user.createdAt)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
