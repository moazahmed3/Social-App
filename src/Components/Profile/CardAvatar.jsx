import { HiCamera } from "react-icons/hi";

export default function CardAvatar({ user, setOpenModalUpdateImage }) {
  return (
    <div className="-mt-24 flex flex-col items-center">
      <div className="relative">
        <img
          src={user.photo}
          alt="avatar"
          className="size-70 rounded-full object-cover"
        />

        <label
          onClick={() => setOpenModalUpdateImage(true)}
          className="absolute bottom-6 right-8 cursor-pointer rounded-full bg-gray-700 p-2 text-white hover:bg-blue-700"
        >
          <HiCamera size={18} />
        </label>
      </div>

      <h1 className="mt-4 text-3xl font-bold">{user.name}</h1>

      <p className="text-gray-500">@{user.username}</p>
    </div>
  );
}
