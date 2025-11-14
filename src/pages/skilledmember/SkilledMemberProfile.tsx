/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar";
import { Camera } from "lucide-react";
import {
  useUpdateUserProfile,
  useUserProfile,
  type UpdateProfilePayload,
} from "@/hooks/users/useUserProfile";
import Loader from "@/components/Loader";
import { useNavigate } from "react-router-dom";

const experienceLevels = ["Beginner", "Intermediate", "Advanced"];

const defaultTools = [
  "Figma",
  "Photoshop",
  "Illustrator",
  "React",
  "Node.js",
  "Vue.js",
  "Angular",
  "Next.js",
  "Express",
  "Tailwind CSS",
  "XD",
  "Sketch",
];
const defaultSkills = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "React",
  "Node.js",
  "SQL",
  "NoSQL",
  "HTML",
  "CSS",
];

export default function SkilledMemberProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage?.getItem("userDetails") || "null");
  const userId = user?.data?.userId; // note API uses _id

  const { data: profileData, isLoading } = useUserProfile(userId);
  console.log("Profile Data:", profileData);
  const updateProfile = useUpdateUserProfile();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    avatar: "",
    points: 0,
    experience: "",
    bio: "",
    email: "",
    profileCompletion: 0,
    // yearsOfExperience: 0,
    tools: [] as string[],
    skills: [] as string[],
  });

  const [yearsOfExperience, setYearsOfExperience] = useState(
    profileData?.data?.years_of_experience?.toString() || ""
  );

  const [customTool, setCustomTool] = useState("");
  const [customSkill, setCustomSkill] = useState("");

  useEffect(() => {
    if (profileData?.data) {
      const p = profileData.data;
      setFormData({
        firstName: p.first_name || "",
        lastName: p.last_name || "",
        role: p.role || "",
        avatar: p.avatar || "",
        points: p.points || 0,
        experience: p.experience_level || "",
        bio: p.description || "",
        email: p.email || "",
        profileCompletion: p.profile_completion || 0,
        // yearsOfExperience: p.years_of_experience || 0,
        tools: p.tools?.length ? p.tools : [],
        skills: p.skills?.length ? p.skills : [],
      });
    }
  }, [profileData]);

  useEffect(() => {
    if (profileData?.data) {
      setYearsOfExperience(
        profileData.data.years_of_experience?.toString() || ""
      );
    }
  }, [profileData]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addCustomTool = () => {
    const trimmed = customTool.trim();
    if (trimmed && !formData.tools.includes(trimmed)) {
      handleChange("tools", [...formData.tools, trimmed]);
      setCustomTool("");
    }
  };

  const addCustomSkill = () => {
    const trimmed = customSkill.trim();
    if (trimmed && !formData.skills.includes(trimmed)) {
      handleChange("skills", [...formData.skills, trimmed]);
      setCustomSkill("");
    }
  };

  useEffect(() => {
    if (profileData?.data) {
      const p = profileData.data;
      setFormData({
        firstName: p.first_name || "",
        lastName: p.last_name || "",
        role: p.role || "",
        avatar: p.avatar || "",
        points: p.points || 0,
        experience: p.experience_level || "",
        bio: p.description || "",
        email: p.email || "",
        profileCompletion: p.profile_completion || 0,
        // yearsOfExperience: p.years_of_experience || 0,
        tools: p.tools?.length ? p.tools : [],
        skills: p.skills?.length ? p.skills : [],
      });
    }
  }, [profileData]);

  const handleSave = async () => {
    const payload: UpdateProfilePayload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      experience_level: formData.experience,
      years_of_experience: yearsOfExperience
        ? Number(yearsOfExperience)
        : undefined,
      description: formData.bio,
      tools: formData.tools.length ? formData.tools : defaultTools,
      skills: formData.skills.length ? formData.skills : defaultSkills,
    };

    try {
      await updateProfile.mutateAsync(payload);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const isProfileComplete = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.role.trim() !== "" &&
      formData.experience.trim() !== "" &&
      yearsOfExperience.trim() !== "" &&
      formData.bio.trim() !== "" &&
      formData.skills.length > 0 &&
      formData.tools.length > 0
    );
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );

  const allTools = Array.from(new Set([...defaultTools, ...formData.tools]));
  const allSkills = Array.from(new Set([...defaultSkills, ...formData.skills]));

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <Button
          className="cursor-pointer"
          onClick={() => navigate("/skilled-member")}
          variant="outline"
          disabled={!isProfileComplete()}
        >
          Go to Dashboard
        </Button>
      </div>

      {!isProfileComplete() && (
        <p className="text-red-500 text-sm mt-1">
          Please fill out all your profile details to access the dashboard.
        </p>
      )}

      {/* Avatar + Name + Role */}
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={formData.avatar}
              alt={`${formData.firstName} ${formData.lastName}`}
            />
            <AvatarFallback className="text-4xl bg-primary text-white">
              {`${formData.firstName[0] || ""}${formData.lastName[0] || ""}`}
            </AvatarFallback>
          </Avatar>
          <label className="absolute bottom-0 right-0 bg-white text-primary p-1 rounded-full cursor-pointer  shadow">
            <Camera className="h-4 w-4" />
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0])
                  handleChange(
                    "avatar",
                    URL.createObjectURL(e.target.files[0])
                  );
              }}
            />
          </label>
        </div>

        {/* User Info */}
        <div className="flex flex-col justify-center gap-1">
          <p className="text-lg font-semibold">
            {formData.firstName} {formData.lastName}
          </p>
          <Badge variant="skilled">{formData.role}</Badge>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="font-medium text-black/70">
              Email:{" "}
              <span className="font-normal text-black/50">
                {formData.email}
              </span>
            </span>
            <span className="font-medium text-black/70">
              Points:{" "}
              <span className="font-normal text-black/50">
                {formData.points}
              </span>{" "}
            </span>
            <span className="font-medium text-black/70">
              Profile Completion:{" "}
              <span className="font-normal text-black/50">
                {formData.profileCompletion}%
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Editable Fields */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-muted-foreground">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="mt-1 block w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-muted-foreground">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="mt-1 block w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-muted-foreground">
              Experience Level
            </label>
            <select
              value={formData.experience}
              onChange={(e) => handleChange("experience", e.target.value)}
              className="mt-1 block w-full border rounded-md px-3 py-2"
            >
              <option value="">Select level</option>
              {experienceLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-muted-foreground">
              Years of Experience
            </label>
            <input
              type="number"
              min={0}
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              className="mt-1 block w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground">
            Short Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            className="mt-1 block w-full border rounded-md px-3 py-2 resize-none"
            rows={3}
          />
        </div>

        {/* Tools Section */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground">
            Tools
          </label>
          <div className="flex flex-wrap gap-2 mt-1">
            {allTools.map((tool) => (
              <button
                key={tool}
                type="button"
                onClick={() =>
                  handleChange(
                    "tools",
                    formData.tools.includes(tool)
                      ? formData.tools.filter((t) => t !== tool)
                      : [...formData.tools, tool]
                  )
                }
                className={`px-3 py-1 rounded-full border cursor-pointer ${
                  formData.tools.includes(tool)
                    ? "bg-primary text-white"
                    : "bg-transparent text-foreground"
                }`}
              >
                {tool}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Add a new tool"
              value={customTool}
              onChange={(e) => setCustomTool(e.target.value)}
              className="flex-1 border rounded-md px-3 py-2"
            />
            <Button onClick={addCustomTool}>Add</Button>
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground">
            Skills
          </label>
          <div className="flex flex-wrap gap-2 mt-1">
            {allSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() =>
                  handleChange(
                    "skills",
                    formData.skills.includes(skill)
                      ? formData.skills.filter((s) => s !== skill)
                      : [...formData.skills, skill]
                  )
                }
                className={`px-3 py-1 rounded-full border cursor-pointer ${
                  formData.skills.includes(skill)
                    ? "bg-primary text-white"
                    : "bg-transparent text-foreground"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Add a new skill"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              className="flex-1 border rounded-md px-3 py-2"
            />
            <Button onClick={addCustomSkill}>Add</Button>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex gap-2">
        <Button
          className="cursor-pointer"
          onClick={handleSave}
          disabled={updateProfile.isPending}
        >
          {updateProfile.isPending ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          className="cursor-pointer"
          onClick={() => navigate("/skilled-member")}
          variant="outline"
          disabled={!isProfileComplete()}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
