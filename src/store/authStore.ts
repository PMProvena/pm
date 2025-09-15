import { create } from "zustand";

type Role = "SUPER_ADMIN" | "MENTOR" | "SKILLED_MEMBER" | "GUEST";

interface AuthState {
  isAuthenticated: boolean;
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  role: "GUEST",

  login: (role) => set({ isAuthenticated: true, role }),
  logout: () => set({ isAuthenticated: false, role: "GUEST" }),
}));
