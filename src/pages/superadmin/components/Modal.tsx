import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export function Modal({
  isOpen,
  message,
}: {
  isOpen: boolean;
  message: string;
}) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-[400px] text-center flex flex-col items-center space-y-4 animate-fadeIn">
        <CheckCircle className="w-12 h-12 text-green-500" />
        <h3 className="text-2xl font-bold text-gray-900">Sent!</h3>
        <p className="text-gray-600">{message}</p>
        <Button
          onClick={() => navigate("/admin/users")}
          className="mt-4 w-auto cursor-pointer"
        >
          Back to User Management
        </Button>
      </div>
    </div>
  );
}
