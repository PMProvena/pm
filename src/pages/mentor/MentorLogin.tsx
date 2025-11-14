import { useLogin } from "@/hooks/auth/useAuth";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../landing/components/ui/button";
import { Input } from "../landing/components/ui/input";
import { Label } from "../landing/components/ui/label";
import toast from "react-hot-toast";

export default function MentorLogin() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(
      { email: formData.email, password: formData.password },
      {
        onSuccess: () => {
          const userDetails = JSON.parse(
            localStorage.getItem("userDetails") || "null"
          );

          let role = userDetails?.data?.role;

          // If role is missing
          if (!role) {
            toast.error(
              "Unable to determine your role. Please contact support."
            );
            return;
          }

          // Convert all non-admin/pm/mentor roles to skilled-member
          if (!["admin", "pm", "mentor"].includes(role)) {
            role = "skilled-member";
          }

          // Reject if NOT mentor
          if (role !== "mentor") {
            toast.error("You are not a Mentor");
            return;
          }

          // Allow mentor to continue
          toast.success("Logged in successfully!");
          navigate("/mentor");
        },
      }
    );
  };

  const isLoading = loginMutation.isPending;

  return (
    <div className="flex items-center justify-center h-screen bg-background px-4 ">
      <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-md border">
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img src="/pngs/logotwo.png" alt="Provena Logo" className="w-40" />
          </Link>
        </div>

        <h1 className="text-2xl font-semibold text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Sign in to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="pl-10 pr-10"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          <div className="text-center mt-2">
            <Button variant="link" className="text-sm cursor-pointer">
              Forgot password?
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
