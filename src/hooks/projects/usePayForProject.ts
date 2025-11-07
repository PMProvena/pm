/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Hook to call your backend after payment succeeds
export const usePayForProject = () => {
  return useMutation({
    mutationFn: async (payload: {
      reference: string;
      projectId: string;
      userId: string;
      amount: number;
      email: string;
    }) => {
      // Replace with your actual API call to save payment
      const res = await fetch("/api/payments/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save payment");

      return res.json();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to record payment.");
    },
  });
};
