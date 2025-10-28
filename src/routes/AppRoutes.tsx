import { Routes, Route } from "react-router-dom";

import HomePage from "@/pages/landing/Home";
import { ProjectSelection } from "@/pages/landing/components/ProjectSelection";
import { Dashboard } from "@/pages/landing/components/Dashboard";

const user = JSON.parse(localStorage.getItem("userDetails") || "null");

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectSelection user={user} />} />
      <Route path="/dashboard" element={<Dashboard user={user} />} />
    </Routes>
  );
}
