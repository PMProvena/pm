import { useState } from "react";
import { AuthModal } from "./components/AuthModal";
import { LandingPage } from "./components/LandingPage";

export default function HomePage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<"login" | "signup">(
    "signup"
  );

  const handleAuthClick = (type: "login" | "signup") => {
    setAuthModalType(type);
    setAuthModalOpen(true);
  };

  // const handleAuthClick = (type: "login" | "signup") => {
  //   setAuthModalType(type);
  //   setAuthModalOpen(true);
  // };

  // const handleAuthSuccess = (userData: User) => {
  //   setUser(userData);
  //   setAuthModalOpen(false);

  //   // If user has completed onboarding (returning user), go to dashboard
  //   // Otherwise, go to project selection
  //   if (userData.hasCompletedOnboarding) {
  //     setCurrentState("dashboard");
  //   } else {
  //     setCurrentState("project-selection");
  //   }
  // };

  // const handleProjectSelect = (project: Project) => {
  //   setSelectedProject(project);
  //   setCurrentState('payment');
  // };

  // const handlePaymentSuccess = () => {
  //   setCurrentState("dashboard");
  //   // Update user to indicate they've completed onboarding
  //   if (user) {
  //     setUser({ ...user, hasCompletedOnboarding: true });
  //   }
  // };

  // const handleBackToProjects = () => {
  //   setCurrentState("project-selection");
  //   setSelectedProject(null);
  // };

  // const handleBackToDashboard = () => {
  //   setCurrentState('dashboard');
  // };

  // Render current state
  // if (currentState === "landing") {
  //   return (
  //     <>
  //       <LandingPage onAuthClick={handleAuthClick} />
  //       <AuthModal
  //         isOpen={authModalOpen}
  //         onClose={() => setAuthModalOpen(false)}
  //         initialTab={authModalType}
  //         onAuthSuccess={handleAuthSuccess}
  //       />
  //     </>
  //   );
  // }

  // if (currentState === "payment" && selectedProject) {
  //   return (
  //     <PaymentFlow
  //       project={selectedProject}
  //       onPaymentSuccess={handlePaymentSuccess}
  //       onBack={handleBackToProjects}
  //     />
  //   );
  // }

  // Fallback - shouldn't reach here
  return (
    <>
      <LandingPage onAuthClick={handleAuthClick} />
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authModalType}
      />
    </>
  );
}
