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
  completedMilestones?: Milestone[]; // ✅ This must be an array, not a number
  milestones?: Milestone[]; // ✅ This must be an array, not a number
  milestonesCount?: number; // optional, can stay for display purposes
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
