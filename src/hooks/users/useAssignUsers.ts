/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";
import toast from "react-hot-toast";

export interface AssignUsersPayload {
  assigned_users: number[];
}

interface AssignUsersResponse {
  success: boolean;
  message: string;
  data?: any; // optionally return the updated project/users
}

export const useAssignUsers = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation<AssignUsersResponse, any, AssignUsersPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.put<AssignUsersResponse>(
        `/projects/${userId}/assign-users`,
        payload
      );
      return data;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Users assigned successfully!");
      // Invalidate any queries that fetch project details or users
      // queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["nonpms"] });
    },
    onError: (error: any) => {
      const errMsg =
        error?.response?.data?.message ||
        "Failed to assign users. Please try again.";
      toast.error(errMsg);
    },
  });
};
