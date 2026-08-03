import { HiCamera } from "react-icons/hi";

export default function CardCover({ cover }) {
  return (
    <div className="relative h-72 overflow-hidden rounded-3xl bg-gradient-to-r from-gray-500 via-gray-500 to-gray-600 shadow-lg">
      {cover && (
        <img src={cover} className="h-full w-full object-cover" alt="" />
      )}

      <label className="absolute bottom-5 right-5 cursor-pointer rounded-full bg-white p-3 shadow-md hover:bg-gray-100">
        <HiCamera size={22} />
      </label>
    </div>
  );
}
