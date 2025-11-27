/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UserType } from "./user";

export interface Milestone {
  id: number | string;
  project_id: string | number;
  week: number;
  title: string;
  status: "pending" | "completed" | "in-progress";
  due_date: string;
  deliverables?: string[];
}

export interface Project {
  assignedUsers: any;
  milestonesCompleted: number;
  _id: string;
  title: string;
  industry: string;
  description: string;
  objectives?: string[];
  requiredSkills?: string[];
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  teamSize: number;
  price: number;
  status: "open" | "in-progress" | "completed";
  owner?: string | null;
  completedMilestones?: Milestone[]; 
  milestones?: any; 
  milestonesCount?: number; 
  createdAt: string;
  updatedAt: string;
}

export interface ProjectSelectionProps {
  user?: UserType;
  // currentProject: Project | null;
  // onStartNewProject: () => void;
}

export interface PaystackInitData {
  email: string;
  amount: number;
  projectId: string;
  userId: string;
}
