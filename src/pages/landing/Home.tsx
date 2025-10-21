import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { AuthModal } from "./components/AuthModal";
import { ProjectSelection } from "./components/ProjectSelection";
import { PaymentFlow } from "./components/PaymentFlow";
import { Dashboard } from "./components/Dashboard";

type AppState = 'landing' | 'project-selection' | 'payment' | 'dashboard';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  hasCompletedOnboarding: boolean;
}

interface Project {
  id: string;
  title: string;
  industry: string;
  description: string;
  duration: string;
  price: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  skills: string[];
  milestones: number;
  teamSize: number;
  icon: React.ReactNode;
  objectives: string[];
}

export default function HomePage() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<'login' | 'signup'>('signup');

  const handleAuthClick = (type: 'login' | 'signup') => {
    setAuthModalType(type);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setAuthModalOpen(false);
    
    // If user has completed onboarding (returning user), go to dashboard
    // Otherwise, go to project selection
    if (userData.hasCompletedOnboarding) {
      setCurrentState('dashboard');
    } else {
      setCurrentState('project-selection');
    }
  };

  // const handleProjectSelect = (project: Project) => {
  //   setSelectedProject(project);
  //   setCurrentState('payment');
  // };

  const handlePaymentSuccess = () => {
    setCurrentState('dashboard');
    // Update user to indicate they've completed onboarding
    if (user) {
      setUser({ ...user, hasCompletedOnboarding: true });
    }
  };

  const handleBackToProjects = () => {
    setCurrentState('project-selection');
    setSelectedProject(null);
  };

  // const handleBackToDashboard = () => {
  //   setCurrentState('dashboard');
  // };

  // Render current state
  if (currentState === 'landing') {
    return (
      <>
        <LandingPage onAuthClick={handleAuthClick} />
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialTab={authModalType}
          onAuthSuccess={handleAuthSuccess}
        />
      </>
    );
  }

  if (currentState === 'project-selection') {
    return (
      <ProjectSelection
        // onProjectSelect={handleProjectSelect}
        // onBack={handleBackToDashboard}
      />
    );
  }

  if (currentState === 'payment' && selectedProject) {
    return (
      <PaymentFlow
        project={selectedProject}
        onPaymentSuccess={handlePaymentSuccess}
        onBack={handleBackToProjects}
      />
    );
  }

  if (currentState === 'dashboard' && user) {
    return (
      <Dashboard
        // user={user}
        // currentProject={selectedProject}
        // onStartNewProject={() => setCurrentState('project-selection')}
      />
    );
  }

  // Fallback - shouldn't reach here
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl mb-4">Something went wrong</h2>
        <button 
          onClick={() => setCurrentState('landing')}
          className="text-primary hover:underline"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}