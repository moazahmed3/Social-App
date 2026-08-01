import { Spinner } from "flowbite-react";

export default function Loader() {
  return (
    <div
      className="h-lvh
     flex justify-center items-center  bg-black/30 fixed top-0 left-0 right-0 bottom-0"
    >
      <Spinner size="xl" color="pink" aria-label="Purple spinner example" />
    </div>
  );
}
