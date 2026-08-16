import { Spinner } from "flowbite-react";

export default function Loader({ color = "pink", size = "xl" }) {
  return (
    <Spinner size={size} color={color} aria-label="Purple spinner example" />
  );
}
