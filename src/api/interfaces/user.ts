export interface UserType {
  data: {
    _id: string;
    id: string;
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    hasCompletedOnboarding: boolean;
  };
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  hasCompletedOnboarding: boolean;
}

 export interface Project {
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
