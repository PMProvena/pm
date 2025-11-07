import { useEffect, useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { DashboardOverview } from "./DashboardOverview";
import { UserManagement } from "./UserManagement";
import { ProjectManagement } from "./ProjectManagement";
import { TeamOversight } from "./TeamOversight";
import { MentorAssignment } from "./MentorAssignment";
import { RewardsSystem } from "./RewardsSystem";
import { QualityControl } from "./QualityControl";
import { useAuthStore } from "@/store/authStore";
import { AuthModal } from "@/pages/landing/components/AuthModal";

export function AdminDashboard() {
  const user = useAuthStore((state) => state.user);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowAuthModal(true);
    }
  }, [user]);

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

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialTab="login"
        onAuthSuccess={() => setShowAuthModal(false)}
        hideSignup={true}
      />
    </AdminLayout>
  );
}
