import { Button, Spinner } from "flowbite-react";

export default function AppButton({ loading, children, className, disable }) {
  return (
    <Button
      disabled={disable}
      className={className + ` cursor-pointer`}
      type={"submit"}
      color="dark"
    >
      {loading && (
        <Spinner
          size="sm"
          aria-label="Purple spinner example"
          className="me-3"
          color="gray"
        />
      )}
      {children}
    </Button>
  );
}
