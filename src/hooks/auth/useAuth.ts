/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

// -------- REGISTER ---------
export const useRegister = () => {
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

      // store full user details and token
      localStorage.setItem("userDetails", JSON.stringify(data));
      localStorage.setItem("pmUserToken", data?.token);
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

      // store full user details and token
      localStorage.setItem("userDetails", JSON.stringify(data));
      localStorage.setItem("pmUserToken", data?.token);
    },
    onError: (error: any) => {
      const errMsg =
        error?.response?.data?.message || "Login failed. Try again.";
      toast.error(errMsg);
    },
  });
};
