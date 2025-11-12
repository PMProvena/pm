/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetNonPM } from "@/hooks/users/useGetNonPM";
import {
  Award,
  CheckCircle,
  Code,
  Database,
  Palette,
  Smartphone,
  Star,
  User,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Error from "./error/Error";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useAssignUsers } from "@/hooks/users/useAssignUsers";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  rating: number;
  completedProjects: number;
  skills: string[];
  avatar?: string;
  bio: string;
}

// interface TeamFormationProps {
//   project: Project;
//   onTeamComplete: () => void;
//   onBack: () => void;
// }

export function TeamFormation() {
  const user = JSON.parse(localStorage?.getItem("userDetails") || "null");
  console.log("user", user);
  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state?.project;
  console.log("current project", project);

  const {
    data: AllNonPM,
    isPending,
    isError,
    refetch: refetchUsers,
  } = useGetNonPM() as {
    data?: any;
    isPending: boolean;
    isError: boolean;
    refetch: () => void;
  };

  const { mutate: assignUsers, isPending: isAssigning } = useAssignUsers(
    project?._id
  );

  console.log("AllNonPM", AllNonPM);

  const [selectedMembers, setSelectedMembers] = useState<{
    [key: string]: TeamMember;
  }>({});
  console.log("selectedMembers", selectedMembers);
  const [showRemovalDialog, setShowRemovalDialog] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<{
    role: string;
    member: TeamMember;
  } | null>(null);
  const [removalReason, setRemovalReason] = useState("");

  // Filter API data to exclude "skilled-member"
  const filteredMembers =
    AllNonPM?.data?.filter((member: any) => member.role !== "skilled-member") ||
    [];

  // Group members by role for your Select/Cards
  const membersByRole: { [key: string]: TeamMember[] } = {};

  // Normalize all roles to lowercase for consistency and then capitalize
  const normalizedRequiredSkills = (project?.requiredSkills || []).map(
    (skill: any) => skill.charAt(0).toUpperCase() + skill.slice(1).toLowerCase()
  );

  const rolesToInclude = new Set([
    ...normalizedRequiredSkills,
    ...(filteredMembers.some((m: any) => m.role.toLowerCase() === "mentor")
      ? ["Mentor"]
      : []),
  ]);

  // Also update the normalizeRole helper function if you're using it
  const normalizeRole = (role: string) => role.toLowerCase().trim();

  rolesToInclude.forEach((role: string) => {
    membersByRole[role] = filteredMembers
      .filter(
        (member: any) => normalizeRole(member.role) === normalizeRole(role)
      )
      .map((member: any) => ({
        id: member._id,
        name: `${member.first_name} ${member.last_name}`,
        role:
          member.role.charAt(0).toUpperCase() +
          member.role.slice(1).toLowerCase(), // Capitalize display
        experience: member.experience_level || "N/A",
        rating: member.points || 0,
        completedProjects: member.completed_projects || 0,
        skills:
          member.skills && member.skills.length > 0
            ? member.skills
            : ["No skills set"],
        bio: member.description || "No bio set",
      }));
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "UI/UX Designer":
        return <Palette className="h-5 w-5" />;
      case "Frontend Developer":
        return <Code className="h-5 w-5" />;
      case "Backend Developer":
        return <Database className="h-5 w-5" />;
      case "Mobile Developer":
        return <Smartphone className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  const handleSelectMember = (role: string, member: TeamMember) => {
    setSelectedMembers((prev) => ({
      ...prev,
      [role]: member,
    }));
  };

  const handleRemoveMember = (role: string, member: TeamMember) => {
    setMemberToRemove({ role, member });
    setShowRemovalDialog(true);
  };

  const confirmRemoval = () => {
    if (memberToRemove) {
      setSelectedMembers((prev) => {
        const updated = { ...prev };
        delete updated[memberToRemove.role];
        return updated;
      });
      setShowRemovalDialog(false);
      setMemberToRemove(null);
      setRemovalReason("");
    }
  };

  const handleAssignUsers = () => {
    const assignedUserIds = Object.values(selectedMembers).map((member) =>
      Number(member.id)
    );

    assignUsers(
      { assigned_users: assignedUserIds },
      {
        onSuccess: (res) => {
          console.log("Users assigned successfully:", res);
          // Optionally navigate or refetch data
          navigate("/project-phase", { state: { project } });
        },
      }
    );
  };

  const isTeamComplete = project?.requiredSkills?.every((skill: any) =>
    Object.keys(selectedMembers)
      .map((key) => key.toLowerCase().trim())
      .includes(skill.toLowerCase().trim())
  );

  console.log("isTeamComplete", isTeamComplete);

  if (isError) return <Error refetchData={refetchUsers} />;

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <Users className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-lg font-semibold mb-2">No Active Project</h2>
        <p className="text-muted-foreground max-w-md">
          You currently don’t have an active project. Once a project is assigned
          or started, you can form your team here.
        </p>
        <Button
          variant="ghost"
          // onClick={onBack}
          className="mt-6 cursor-pointer"
        >
          ← Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-6 cursor-pointer"
          >
            ← Back to Dashboard
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl mb-2">Build Your Team</h1>
            <p className="text-muted-foreground">
              Select skilled team members for {project?.title}
            </p>
          </div>

          {isPending ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Team Overview */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Team Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {project?.requiredSkills?.map((skill: any) => {
                        const skillKey = skill.toLowerCase().trim();
                        const isSelected = Object.keys(selectedMembers)
                          .map((key) => key.toLowerCase().trim())
                          .includes(skillKey);

                        return (
                          <div
                            key={skill}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2">
                              {getRoleIcon(skill)}
                              <span className="text-sm">{skill}</span>
                            </div>
                            {isSelected ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <div className="h-4 w-4 border-2 border-muted rounded-full" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Team Formation</span>
                        <span>
                          {Object.keys(selectedMembers)?.length}/
                          {project.requiredSkills?.length}
                        </span>
                      </div>
                      <div className="bg-muted rounded-full h-2">
                        {project.requiredSkills && (
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{
                              width: `${
                                (Object.keys(selectedMembers).length /
                                  project.requiredSkills.length) *
                                100
                              }%`,
                            }}
                          />
                        )}
                      </div>
                    </div>

                    {isTeamComplete && (
                      <Button
                        className="w-full cursor-pointer"
                        onClick={handleAssignUsers}
                      >
                        <Users className="h-4 w-4" />
                        {isAssigning
                          ? "Completing..."
                          : " Complete Team Formation"}
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Selected Team Members */}
                {Object.keys(selectedMembers).length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Selected Team</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {Object.entries(selectedMembers)?.map(
                        ([role, member]) => (
                          <div
                            key={role}
                            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs">
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm">{member.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {role}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleRemoveMember(role, member)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Available Members */}
              <div className="lg:col-span-3 space-y-8">
                {Object.keys(membersByRole)?.map((role: string) => (
                  <div key={role}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {getRoleIcon(role)}
                        <h2 className="text-xl">{role}</h2>
                        {selectedMembers[role] && (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            Selected
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {membersByRole[role]?.map((member) => (
                        <Card
                          key={member.id}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedMembers[role]?.id === member.id
                              ? "ring-2 ring-primary bg-primary/5"
                              : ""
                          }`}
                          onClick={() => handleSelectMember(role, member)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-3">
                                <Avatar>
                                  <AvatarFallback>
                                    {member.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-base">
                                    {member.name}
                                  </CardTitle>
                                  <CardDescription className="text-sm">
                                    {member.experience}
                                  </CardDescription>
                                </div>
                              </div>
                              {selectedMembers[role]?.id === member.id && (
                                <CheckCircle className="h-5 w-5 text-primary" />
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {member.bio}
                            </p>

                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>{member.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Award className="h-3 w-3 text-muted-foreground" />
                                <span>{member.completedProjects} projects</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {member.skills
                                .slice(0, 3)
                                ?.map((skill, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              {member.skills.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{member.skills.length - 3}
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Removal Dialog */}
      <Dialog open={showRemovalDialog} onOpenChange={setShowRemovalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Team Member</DialogTitle>
            <DialogDescription>
              Please provide a reason for removing {memberToRemove?.member.name}{" "}
              from your team. This request will be sent to the admin for
              approval.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Reason for removal</Label>
              <Textarea
                id="reason"
                placeholder="Please explain why you want to remove this team member..."
                value={removalReason}
                onChange={(e) => setRemovalReason(e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowRemovalDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={confirmRemoval} disabled={!removalReason.trim()}>
                Submit Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
