/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface PaystackInitData {
  email: string;
  amount: number;
  projectId: string;
  userId: string;
}

export const usePayForProject = () => {
  return useMutation({
    mutationFn: async (payload: PaystackInitData) => {
      // Prepare Paystack config
      const config = {
        // reference: new Date().getTime().toString(),
        email: payload.email,
        amount: payload.amount * 100, // convert to kobo

        // currency: "USD",
        publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        metadata: {
          projectId: payload.projectId,
          userId: payload.userId,
        },
        // text: "Pay Now",
        // onSuccess: () =>
        //   alert("Thanks for doing business with us! Come back soon!!"),
        // onClose: () => alert("Wait! You need this oil, don't go!!!!"),
      };

      return config;
    },
    onError: (err: any) => {
      console.error(err);
      toast.error("Error initializing payment. Please try again.");
    },
  });
};
