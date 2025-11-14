import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useState, useEffect } from "react";

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");
    const storedToken = localStorage.getItem("pmUserToken");

    const user = storedUser ? JSON.parse(storedUser) : null;
    setUserRole(user?.data?.role || null);
    setToken(storedToken || null);

    setIsLoading(false);
  }, []);

  if (isLoading) return null; // or a spinner

  if (!token || !userRole)
    return <Navigate to="/skilled-member/login" replace />;
  if (!allowedRoles.includes(userRole))
    return <Navigate to="/skilled-member/login" replace />;

  return children;
}
