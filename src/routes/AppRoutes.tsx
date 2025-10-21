import { Routes, Route } from "react-router-dom";

import HomePage from "@/pages/landing/Home";
import { ProjectSelection } from "@/pages/landing/components/ProjectSelection";
import { Dashboard } from "@/pages/landing/components/Dashboard";

const user = {
  id: "1",
  email: "xyz.gmail.com",
  firstName: "User",
  lastName: "Demo",
  role: "pm",
  hasCompletedOnboarding: true,
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectSelection />} />
      <Route path="/dashboard" element={<Dashboard user={user} />} />

      {/* One Dashboard Route */}
      {/* <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={["SUPER_ADMIN", "MENTOR", "SKILLED_MEMBER"]}
          >
            <Dashboard />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  );
}
