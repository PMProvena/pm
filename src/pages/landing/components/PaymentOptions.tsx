import { PayButton } from "@/components/PayButton";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Button } from "./ui/button";

interface PaymentOptionsProps {
  email: string;
  amount: number;
  projectId: string;
  userId: string;

}

export function PaymentOptions({
  email,
  amount,
  projectId,
  userId,

}: PaymentOptionsProps) {
  const [open, setOpen] = useState(false);

  const handleFlutterwavePayment = () => {
    setOpen(false); // close the modal immediately
    // Then handle your Flutterwave logic
    // window.location.href = `/api/flutterwave/initiate/${projectId}?email=${email}&amount=${amount}`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full cursor-pointer text-lg font-medium">
          Start This Project
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-xl px-6 py-8">
        <DialogHeader className="-mt-4">
          <DialogTitle className="text-left text-xl font-semibold">
            Choose Payment Method
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-6">
          {/* Paystack Card */}
          <PayButton
            email={email}
            amount={amount}
            projectId={projectId}
            userId={userId}
          
            setOpen={setOpen}
          >
            <div className="flex items-center justify-center gap-3 p-2  transition cursor-pointer">
              <img src="/pngs/pay.png" alt="Paystack" width={40} height={40} />
              <span className="font-medium text-lg">Pay with Paystack</span>
            </div>
          </PayButton>

          {/* Flutterwave Card */}

          <button
            onClick={handleFlutterwavePayment}
            // className="flex items-center justify-center gap-3 p-4 border rounded-lg hover:shadow-md transition"
          >
            <div className="flex items-center justify-center gap-3 p-4 border rounded-lg hover:shadow-md transition cursor-pointer">
              <img
                src="/pngs/fw.png"
                alt="Flutterwave"
                width={40}
                height={40}
              />
              <span className="font-medium text-lg">Pay with Flutterwave</span>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
