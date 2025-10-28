import type { UserType } from "./user";

export interface DashboardProps {
  user?: UserType;
  // currentProject: Project | null;
  // onStartNewProject: () => void;
}

export interface DashboardData {
  profileCompletion: number;
  points: number;
  projects: number;
  certificates: number;
  activeProjects: number;
  milestones: {
    completed: number;
    total: number;
  };
  pointsEarned: {
    value: number;
    period: string;
  };
  recentActivity: any[];
  notifications: any[];
}