/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";
import toast from "react-hot-toast";

export interface Milestone {
  week: number;
  status: string;
  due_date: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface MilestonesBulkPayload {
  milestones: Milestone[];
}

interface MilestonesResponse {
  success: boolean;
  message: string;
  data: Milestone[];
}

export const useCreateMilestonesBulk = (projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation<MilestonesResponse, any, MilestonesBulkPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post<MilestonesResponse>(
        `/projects/${projectId}/milestones-bulk`,
        payload
      );
      return data;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Milestones created successfully!");
       queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: any) => {
      const errMsg =
        error?.response?.data?.message ||
        "Failed to create milestones. Please try again.";
      toast.error(errMsg);
    },
  });
};
