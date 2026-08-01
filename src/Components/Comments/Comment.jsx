import {
  Avatar,
  Card,
  Dropdown,
  DropdownDivider,
  DropdownItem,
} from "flowbite-react";
import { formatDate } from "../../lib/formatDate";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Comment({ comment }) {
  const { commentCreator, content, createdAt } = comment;

  const { name, username, photo } = commentCreator;

  return (
    <Card className="shadow-sm">
      <div className="flex gap-3">
        <Avatar img={photo} rounded />

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{name}</h3>

              <span className="text-sm text-gray-500">
                @{username} • {formatDate(createdAt)}
              </span>
            </div>

            <Dropdown
              arrowIcon={false}
              renderTrigger={() => (
                <button className="cursor-pointer rounded-full p-2 hover:bg-gray-100 transition">
                  <HiOutlineDotsHorizontal size={20} />
                </button>
              )}
            >
              <DropdownItem icon={FaRegEdit}>Edit</DropdownItem>

              <DropdownDivider />

              <DropdownItem icon={MdDelete} className="text-red-600">
                Delete
              </DropdownItem>
            </Dropdown>
          </div>

          <p className="mt-3 text-gray-700 whitespace-pre-line">{content}</p>
        </div>
      </div>
    </Card>
  );
}
