/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type ReactNode } from "react";
import { usePaystackPayment } from "react-paystack";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { usePayForProject } from "@/hooks/projects/usePayForProject";
import { useQueryClient } from "@tanstack/react-query";

interface PayButtonProps {
  email: string;
  amount: number;
  projectId: string;
  userId: string;
  children?: ReactNode;
}

export const PayButton: React.FC<PayButtonProps> = ({
  email,
  amount,
  projectId,
  userId,
  children,
}) => {
  const navigate = useNavigate();
  const mutation = usePayForProject();
  const queryClient = useQueryClient();

  const paystackConfig = {
    email,
    amount: amount * 100, // convert to kobo
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    // metadata: {
    //   projectId,
    //   userId,
    // },
    metadata: {
      custom_fields: [
        {
          display_name: "Project ID",
          variable_name: "projectId",
          value: projectId,
        },
        { display_name: "User ID", variable_name: "userId", value: userId },
      ],
    },
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const handlePay = () => {
    initializePayment({
      onSuccess: async (response) => {
        try {
          // Only send minimal info; hook will format it correctly
          await mutation.mutateAsync({
            reference: response.reference,
            projectId,
            userId,
            amount,
          });

          // ✅ Refetch dashboard after payment
          queryClient.invalidateQueries({ queryKey: ["dashboard"] });

          toast.success("Payment successful!");
          navigate("/dashboard");
        } catch (err: any) {
          console.log(err);
          // toast.error(err.message || "Payment saved but backend failed.");
        }
      },
      onClose: () => {
        toast.error("Payment cancelled.");
      },
    });
  };

  return (
    <button
      onClick={handlePay}
      disabled={mutation.isPending}
      className="w-full bg-primary text-white py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
    >
      {mutation.isPending
        ? "Processing..."
        : children || `Pay ₦${amount} & Start Project`}
    </button>
  );
};
