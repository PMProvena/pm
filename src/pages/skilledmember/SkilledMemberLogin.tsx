/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLogin } from "@/hooks/auth/useAuth";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../landing/components/ui/button";
import { Input } from "../landing/components/ui/input";
import { Label } from "../landing/components/ui/label";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { useUserProfile } from "@/hooks/users/useUserProfile";

export default function SkilledMemberLogin() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const [justLoggedIn, setJustLoggedIn] = useState(false);

  // Fetch profile once we know the userId
  const user = JSON.parse(localStorage?.getItem("userDetails") || "null");
  const userId = user?.data?.userId;

  const { data: profileData, isLoading: profileLoading } = useUserProfile(
    justLoggedIn ? userId : undefined,
    { enabled: justLoggedIn }
  );

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  // const [redirecting, setRedirecting] = useState(false);

  // const [redirectTarget, setRedirectTarget] = useState<
  //   "dashboard" | "profile" | null
  // >(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const allProfileFieldsFilled = (data: any) => {
    if (!data) return false;
    return (
      data.first_name &&
      data.last_name &&
      data.role &&
      data.experience_level &&
      data.years_of_experience &&
      data.description &&
      data.tools?.length > 0 &&
      data.skills?.length > 0
    );
  };

  useEffect(() => {
    if (justLoggedIn && profileData?.data) {
      const target = allProfileFieldsFilled(profileData.data)
        ? "/skilled-member"
        : "/skilled-member/profile";
      navigate(target);
    }
  }, [justLoggedIn, profileData, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(
      { email: formData.email, password: formData.password },
      {
        onSuccess: (data) => {
          let role = data?.data?.role;

          if (!["admin", "pm", "mentor"].includes(role)) {
            role = "skilled-member";
          }

          // Save the modified userDetails with role
          const updatedUserDetails = { ...data, data: { ...data.data, role } };
          localStorage.setItem(
            "userDetails",
            JSON.stringify(updatedUserDetails)
          );

          if (role === "skilled-member") {
            localStorage.setItem("pmUserToken", data.data.token);
            toast.success("Logged in successfully!");
            setJustLoggedIn(true);
          } else {
            toast.error("You are not a Skilled Member");
          }
        },
      }
    );
  };

  const loginInProgress = loginMutation.isPending;
  // const redirectingInProgress = redirecting || (justLoggedIn && profileLoading);

  // Full-screen loader while redirecting after login
  if (justLoggedIn && profileLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <Loader />
        <p className="mt-4 text-lg font-medium">Loading...</p>
      </div>
    );
  }

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
            disabled={loginInProgress}
          >
            {loginInProgress ? "Signing In..." : "Sign In"}
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
