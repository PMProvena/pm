import type { UserType } from "./user";

export interface Project {
  id: string;
  _id: string;
  title: string;
  industry: string;
  description: string;
  duration: string;
  price: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  skills: string[];
  requiredSkills: string[];
  milestones: number;
  teamSize: number;
  icon: React.ReactNode;
  objectives: string[];
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