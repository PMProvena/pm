/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Project } from "./projects";
import type { UserType } from "./user";

export interface DashboardProps {
  user?: UserType;
  // currentProject: Project | null;
  // onStartNewProject: () => void;
}

export interface DashboardData {
  data: {
    activeProjects: number;
    certificates: number;
    milestones: {
      completed: number;
      total: number;
    };
    myProjects: Project[];
    notifications: {
      message: string;
      timeAgo: string;
    }[];
    points: number;
    pointsEarned: {
      value: number;
      period: string;
    };
    profileCompletion: number;
    projects: number;
    recentActivity: {
      message: string;
      timeAgo: string;
      type: string;
    }[];
  };
}
