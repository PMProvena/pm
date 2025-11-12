import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "@/pages/landing/Home";
import { Dashboard } from "@/pages/landing/components/Dashboard";
import { ProjectSelection } from "@/pages/landing/components/ProjectSelection";
import ProtectedRoute from "./ProtectedRoute";

import { PaymentFlow } from "@/pages/landing/components/PaymentFlow";
import MentorDashboardd from "@/pages/mentor/Dashboard";
import SkilledMemberDashboard from "@/pages/skilledmember/Dashboard";
import SuperAdminDashboard from "@/pages/superadmin/AdminLayout";
import AdminLogin from "@/pages/superadmin/AdminLogin";
import { DashboardOverview } from "@/pages/superadmin/components/DashboardOverview";
import { MentorAssignment } from "@/pages/superadmin/components/MentorAssignment";
import { ProjectManagement } from "@/pages/superadmin/components/ProjectManagement";
import { QualityControl } from "@/pages/superadmin/components/QualityControl";
import { RewardsSystem } from "@/pages/superadmin/components/RewardsSystem";
import { TeamOversight } from "@/pages/superadmin/components/TeamOversight";
import { UserManagement } from "@/pages/superadmin/components/UserManagement";
import CreateProjectForm from "@/pages/superadmin/components/CreateProjectForm";
import AddNewUser from "@/pages/superadmin/components/AddNewUser";

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

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardOverview />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="users/new" element={<AddNewUser />} />
        <Route path="projects" element={<ProjectManagement />} />
        <Route path="projects/new" element={<CreateProjectForm />} />
        <Route path="teams" element={<TeamOversight />} />
        <Route path="mentors" element={<MentorAssignment />} />
        <Route path="rewards" element={<RewardsSystem />} />
        <Route path="quality" element={<QualityControl />} />

        {/* default redirect if /admin is hit */}
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Route>

      <Route
        path="/mentor"
        element={
          <ProtectedRoute allowedRoles={["mentor"]}>
            <MentorDashboardd />
          </ProtectedRoute>
        }
      />

      <Route
        path="/skilled-member"
        element={
          <ProtectedRoute allowedRoles={["skilled"]}>
            <SkilledMemberDashboard />
          </ProtectedRoute>
        }
      />

      {/* Redirect Unknown Routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
