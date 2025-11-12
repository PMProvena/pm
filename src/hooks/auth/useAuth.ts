/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// -------- REGISTER ---------
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      experienceLevel: string;
    }) => {
      const { data } = await api.post("/auth/register", payload);
      return data;
    },
    onSuccess: (data) => {
      toast.success("Account created successfully!");

      // Store full response
      localStorage.setItem("userDetails", JSON.stringify(data));

      // Store token for convenience
      const token = data?.data?.token;
      if (token) {
        localStorage.setItem("pmUserToken", token);
      } else {
        console.warn("No token found in register response:", data);
      }

      // ✅ Refetch all users immediately
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      const errMsg =
        error?.response?.data?.message || "Registration failed. Try again.";
      toast.error(errMsg);
    },
  });
};

// -------- LOGIN ---------
export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const { data } = await api.post("/auth/login", payload);
      return data;
    },
    onSuccess: (data) => {
      toast.success("Logged in successfully!");

      // Store full response
      localStorage.setItem("userDetails", JSON.stringify(data));

      // Store token for convenience
      const token = data?.data?.token;
      if (token) {
        localStorage.setItem("pmUserToken", token);
      } else {
        console.warn("No token found in login response:", data);
      }
    },
    onError: (error: any) => {
      const errMsg =
        error?.response?.data?.message || "Login failed. Try again.";
      toast.error(errMsg);
    },
  });
};
