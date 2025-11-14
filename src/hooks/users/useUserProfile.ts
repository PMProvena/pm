/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";
import toast from "react-hot-toast";

// Define the payload type
export interface UpdateProfilePayload {
  first_name: string;
  last_name: string;
  experience_level: string;
  description?: string;
  years_of_experience?: number;
  skills?: string[];
  tools?: string[];
}

// Define the response type (adjust as per your API)
interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data?: any;
}

// --- Hook to fetch user profile ---
export const useUserProfile = (userId: number) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const { data } = await api.get(`/users/${userId}`);
      return data;
    },
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
};

// --- Hook to update user profile ---
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateProfileResponse, any, UpdateProfilePayload>({
    mutationFn: async (payload) => {
      const { data } = await api.put<UpdateProfileResponse>(
        "/users/update",
        payload
      );
      return data;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      const errMsg =
        error?.response?.data?.message || "Failed to update profile.";
      toast.error(errMsg);
    },
  });
};
