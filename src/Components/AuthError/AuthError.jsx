import { Link } from "react-router-dom";
import AppButton from "../Shared/AppButton/AppButton";

export default function AuthError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Session Expired</h2>

      <p className="text-gray-500">Please login again.</p>

      <Link to="/login">
        <AppButton>Login Again</AppButton>
      </Link>
    </div>
  );
}
