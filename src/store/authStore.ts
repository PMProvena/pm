/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

type Role = "SUPER_ADMIN" | "MENTOR" | "SKILLED_MEMBER" | "PM" | "GUEST";

// interface User {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   role: Role;
//   subRole?: string;
//   hasCompletedOnboarding?: boolean;
// }

interface AuthState {
  isAuthenticated: boolean;
  role: Role;
  user: any | null;
  login: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  role: "GUEST",
  user: null,

  login: (user) =>
    set({ isAuthenticated: true, role: user.role, user }),

  logout: () =>
    set({ isAuthenticated: false, role: "GUEST", user: null }),
}));
