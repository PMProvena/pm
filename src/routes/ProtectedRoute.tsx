import { Navigate } from "react-router-dom";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  // Retrieve stored user details and token
  const storedUser = localStorage.getItem("userDetails");
  const token = localStorage.getItem("pmUserToken");

  const user = storedUser ? JSON.parse(storedUser) : null;
  const role = user?.data?.role;

  // Not logged in → go to home
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // Logged in but role not allowed → go to home
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // Allowed → render the protected content
  return children;
}
