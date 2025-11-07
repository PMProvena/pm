import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "@/pages/landing/Home";
import { ProjectSelection } from "@/pages/landing/components/ProjectSelection";
import { Dashboard } from "@/pages/landing/components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import SuperAdminDashboard from "@/pages/superadmin/Dashboard";
import MentorDashboardd from "@/pages/mentor/Dashboard";
import SkilledMemberDashboard from "@/pages/skilledmember/Dashboard";
import { PaymentFlow } from "@/pages/landing/components/PaymentFlow";

const user = JSON.parse(localStorage.getItem("userDetails") || "null");
console.log("user", user);

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectSelection user={user} />} />
      <Route path="/payment" element={<PaymentFlow />} />

      {/* Protected Routes (Role-Based) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["pm"]}>
            <Dashboard user={user} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          // <ProtectedRoute allowedRoles={["admin"]}>
          <SuperAdminDashboard />
          // </ProtectedRoute>
        }
      />

      <Route
        path="/mentor"
        element={
          // <ProtectedRoute allowedRoles={["mentor"]}>
          <MentorDashboardd />
          // </ProtectedRoute>
        }
      />

      <Route
        path="/skilled-member"
        element={
          // <ProtectedRoute allowedRoles={["skilled"]}>
          <SkilledMemberDashboard />
          // </ProtectedRoute>
        }
      />

      {/* Redirect Unknown Routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
