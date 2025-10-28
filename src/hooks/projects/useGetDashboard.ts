/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api/axios";
import type { DashboardData } from "@/api/interfaces/dashboard";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetDashboard = () => {
  return useQuery<DashboardData>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const { data } = await api.get("/dashboard");
      return data;
    },
    onError: (error: any) => {
      const errMsg =
        error?.response?.data?.message ||
        "Failed to fetch projects. Please try again.";
      toast.error(errMsg);
    },
  } as any); // ✅ workaround for TS type mismatch in React Query v5
};
