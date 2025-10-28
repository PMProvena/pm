/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await api.get("/projects/available");
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
