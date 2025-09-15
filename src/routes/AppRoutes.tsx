import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "@/pages/landing/Home";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<HomePage />} />

      {/* One Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={["SUPER_ADMIN", "MENTOR", "SKILLED_MEMBER"]}
          >
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
