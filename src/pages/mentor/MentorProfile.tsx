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

const mentorshipTitles = ["Senior PM", "VP of Product", "Growth"];
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
const socialPlatforms = [
  "Twitter",
  "LinkedIn",
  "Instagram",
  "Facebook",
  "Website",
];

const MentorProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage?.getItem("userDetails") || "null");
  const userId = user?.data?.userId;

  const { data: profileData, isLoading } = useUserProfile(userId);
  const updateProfile = useUpdateUserProfile();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mentorshipTitle: "",
    avatar: "",
    yearsOfExperience: "",
    bio: "",
    tools: [] as string[],
    socialLinks: [] as { platform: string; url: string }[],
  });

  const [customTool, setCustomTool] = useState("");
  const [socialPlatform, setSocialPlatform] = useState("");
  const [socialUrl, setSocialUrl] = useState("");

  useEffect(() => {
    if (profileData?.data) {
      const p = profileData.data;
      setFormData({
        firstName: p.first_name || "",
        lastName: p.last_name || "",
        mentorshipTitle: p.mentorship_title || "",
        avatar: p.avatar || "",
        yearsOfExperience: p.years_of_experience?.toString() || "",
        bio: p.description || "",
        tools: p.tools?.length ? p.tools : [],
        socialLinks: p.social_links?.length ? p.social_links : [],
      });
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

  const addSocialLink = () => {
    if (!socialPlatform || !socialUrl) return;
    handleChange("socialLinks", [
      ...formData.socialLinks,
      { platform: socialPlatform, url: socialUrl },
    ]);
    setSocialPlatform("");
    setSocialUrl("");
  };

  const handleSave = async () => {
    const payload: UpdateProfilePayload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      mentorship_title: formData.mentorshipTitle,
      years_of_experience: Number(formData.yearsOfExperience),
      description: formData.bio,
      tools: formData.tools,
      social_links: formData.socialLinks,
    };

    console.log("payload", payload);

    try {
      await updateProfile.mutateAsync(payload);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const isProfileComplete = () =>
    formData.firstName &&
    formData.lastName &&
    formData.mentorshipTitle &&
    formData.yearsOfExperience &&
    formData.bio &&
    formData.tools.length > 0;

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Button
          className="cursor-pointer"
          onClick={() => navigate("/mentor-dashboard")}
          variant="outline"
          disabled={!isProfileComplete()}
        >
          Go to Dashboard
        </Button>
      </div>

      {!isProfileComplete() && (
        <p className="text-red-500 text-sm mt-1">
          Please fill out all profile details to access the dashboard.
        </p>
      )}

      {/* Avatar + Name + Mentorship Title */}
      <div className="flex items-center gap-6">
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
          <label className="absolute bottom-0 right-0 bg-white text-primary p-1 rounded-full cursor-pointer shadow">
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

        <div className="flex flex-col justify-center gap-1">
          <p className="text-lg font-semibold">
            {formData.firstName} {formData.lastName}
          </p>
          <Badge variant="mentor">{formData.mentorshipTitle}</Badge>
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
              Mentorship Title
            </label>
            <select
              value={formData.mentorshipTitle}
              onChange={(e) => handleChange("mentorshipTitle", e.target.value)}
              className="mt-1 block w-full border rounded-md px-3 py-2"
            >
              <option value="">Select title</option>
              {mentorshipTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
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
              value={formData.yearsOfExperience}
              onChange={(e) =>
                handleChange("yearsOfExperience", e.target.value)
              }
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

        {/* Tools */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground">
            Tools
          </label>
          <div className="flex flex-wrap gap-2 mt-1">
            {Array.from(new Set([...defaultTools, ...formData.tools])).map(
              (tool) => (
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
              )
            )}
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

        {/* Social Media */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground">
            Social Media Links
          </label>
          <div className="flex gap-2 mt-2">
            <select
              value={socialPlatform}
              onChange={(e) => setSocialPlatform(e.target.value)}
              className="border rounded-md px-3 py-2"
            >
              <option value="">Select platform</option>
              {socialPlatforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Add profile link"
              value={socialUrl}
              onChange={(e) => setSocialUrl(e.target.value)}
              className="flex-1 border rounded-md px-3 py-2"
            />
            <Button onClick={addSocialLink}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.socialLinks.map((link, index) => (
              <Badge key={index} variant="secondary">
                {link.platform}: {link.url}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex gap-2 mt-4">
        <Button onClick={handleSave} disabled={updateProfile.isPending}>
          {updateProfile.isPending ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          onClick={() => navigate("/mentor-dashboard")}
          variant="outline"
          disabled={!isProfileComplete()}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default MentorProfile;
