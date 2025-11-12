"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useRegister } from "@/hooks/auth/useAuth";
import { Modal } from "./Modal";

export default function AddNewUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const registerMutation = useRegister();
  const isPending = registerMutation.isPending;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    experienceLevel: "",
    role: "", // <-- added role
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (
    field: "experienceLevel" | "role",
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { firstName, lastName, email, password, experienceLevel, role } =
      formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !experienceLevel ||
      !role
    ) {
      return alert("Please fill in all fields");
    }

    registerMutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });

        // Set modal message based on role
        const message =
          role === "mentor"
            ? "Login details have been sent to the Mentor"
            : "Login details have been sent to the Skilled Member";

        setModalMessage(message);
        setIsModalOpen(true);

        // Optionally, reset form after adding user
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          experienceLevel: "",
          role: "",
        });
      },
    });
  };

  return (
    <>
      <Card className="p-6 space-y-5 max-w-[600px] w-full mx-auto mt-10">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between w-full">
              <h2 className="text-xl font-semibold">Add New User</h2>
              <button
                onClick={() => navigate("/admin/users")}
                className="text-sm text-gray-500 font-semibold cursor-pointer"
              >
                Go Back
              </button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <Input
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            {/* Password with toggle eye */}
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Role Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <Select
                onValueChange={(val) => handleSelectChange("role", val)}
                value={formData.role}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mentor">Mentor</SelectItem>
                  <SelectItem value="skilled-member">Skilled Member</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Experience Level Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <Select
                onValueChange={(val) =>
                  handleSelectChange("experienceLevel", val)
                }
                value={formData.experienceLevel}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner (0-1 years)</SelectItem>
                  <SelectItem value="Intermediate">
                    Intermediate (1-3 years)
                  </SelectItem>
                  <SelectItem value="Experienced">
                    Experienced (3+ years)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => navigate(-1)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="cursor-pointer"
              >
                {isPending ? "Adding..." : "Add User"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} message={modalMessage} />
    </>
  );
}
