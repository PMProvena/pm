import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useState, useEffect } from "react";

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

const loginRoutes: Record<string, string> = {
  "skilled-member": "/skilled-member/login",
  mentor: "/mentor/login",
  admin: "/admin/login",
  pm: "/",
};

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");
    const storedToken = localStorage.getItem("pmUserToken"); // or generalize if needed

    const user = storedUser ? JSON.parse(storedUser) : null;
    setUserRole(user?.data?.role || null);
    setToken(storedToken || null);

    setIsLoading(false);
  }, []);

  if (isLoading) return null; // or a spinner

  // no token or no role
  if (!token || !userRole) {
    const redirectTo =
      allowedRoles[0] in loginRoutes ? loginRoutes[allowedRoles[0]] : "/";
    return <Navigate to={redirectTo} replace />;
  }

  // role not allowed
  if (!allowedRoles.includes(userRole)) {
    const redirectTo = userRole in loginRoutes ? loginRoutes[userRole] : "/";
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
