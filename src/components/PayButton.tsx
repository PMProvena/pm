/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type ReactNode } from "react";
import { usePaystackPayment } from "react-paystack";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { usePayForProject } from "@/hooks/projects/usePayForProject";

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
  children, // ✅ destructure children
}) => {
  const navigate = useNavigate();
  const mutation = usePayForProject();

  const paystackConfig = {
    // reference: new Date().getTime().toString(),
    email,
    amount: amount * 100,
    //  currency: "USD",
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
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

  const handlePay = async () => {
    try {
      await mutation.mutateAsync({ email, amount, projectId, userId });

      initializePayment({
        onSuccess: () => {
          toast.success("Payment successful! Redirecting...");
          navigate("/dashboard");
        },
        onClose: () => {
          toast.error("Payment cancelled.");
        },
      });
    } catch (err: any) {
      console.log("err", err);
      toast.error(err.message || "Failed to start payment. Please try again.");
    }
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
