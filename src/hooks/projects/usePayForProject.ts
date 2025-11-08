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
    }) => {
      // Backend expects payload in this structure
      const body = {
        event: "charge.success",
        data: {
          reference: payload.reference,
          amount: payload.amount,
          currency: "NGN",
          metadata: {
            projectId: payload.projectId,
            userId: payload.userId,
          },
        },
      };

      const res = await fetch(
        "https://shula-pm-php.onrender.com/api/payments/webhook",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) throw new Error("Failed to save payment");

      return res.json();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to record payment.");
    },
  });
};
