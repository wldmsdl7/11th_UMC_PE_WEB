import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <Outlet />
    </div>
  );
}