import { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { DashboardOverview } from "./DashboardOverview";
import { UserManagement } from "./UserManagement";
import { ProjectManagement } from "./ProjectManagement";
import { TeamOversight } from "./TeamOversight";
import { MentorAssignment } from "./MentorAssignment";
import { RewardsSystem } from "./RewardsSystem";
import { QualityControl } from "./QualityControl";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "users":
        return <UserManagement />;
      case "projects":
        return <ProjectManagement />;
      case "teams":
        return <TeamOversight />;
      case "mentors":
        return <MentorAssignment />;
      case "rewards":
        return <RewardsSystem />;
      case "quality":
        return <QualityControl />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
}