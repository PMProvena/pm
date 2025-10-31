export interface UserType {
  data: {
    _id: string;
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    hasCompletedOnboarding: boolean;
  };
}
