/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetMyProjects = () => {
  return useQuery({
    queryKey: ["myProjects"],
    queryFn: async () => {
      const { data } = await api.get("/projects/my-projects");
      return data;
    },
    onError: (error: any) => {
      const errMsg =
        error?.response?.data?.message ||
        "Failed to fetch MY projects. Please try again.";
      toast.error(errMsg);
    },
     retry: 0,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minute
  } as any); // ✅ workaround for TS type mismatch in React Query v5
};
