/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

type Role = "SUPER_ADMIN" | "MENTOR" | "SKILLED_MEMBER" | "PM" | "GUEST";


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
