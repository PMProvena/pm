/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import api from "@/api/axios";
import toast from "react-hot-toast";

export interface CreateProjectPayload {
  title: string;
  industry: string;
  description: string;
  objectives: string[];
  required_skills: string[];
  duration: string; // e.g., "8 weeks"
  difficulty: string;
  team_size: number;
  price: number;
}

export interface Project {
  _id: string;
  title: string;
  industry: string;
  description: string;
  objectives: string[];
  requiredSkills: string[];
  duration: string;
  difficulty: string;
  teamSize: number;
  price: number;
  milestones: any[];
  milestonesCount: number;
  assignedUsers: any[];
  status: string;
  owner: any | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectResponse {
  success: boolean;
  message: string;
  project: Project;
}

export const useCreateProject = () => {
  return useMutation<CreateProjectResponse, any, CreateProjectPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post<CreateProjectResponse>(
        "/projects/create",
        payload
      );
      return data;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Project created successfully!");
    },
    onError: (error: any) => {
      const errMsg =
        error?.response?.data?.message ||
        "Failed to create project. Please try again.";
      toast.error(errMsg);
    },
  });
};
