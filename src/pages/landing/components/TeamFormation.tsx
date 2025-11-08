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

interface Project {
  id: string;
  title: string;
  industry: string;
  description: string;
  duration: string;
  price: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  skills: string[];
  milestones: number;
  teamSize: number;
  icon: React.ReactNode;
  objectives: string[];
}

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

interface TeamFormationProps {
  project: Project;
  onTeamComplete: () => void;
  onBack: () => void;
}

export function TeamFormation({
  project,
  onTeamComplete,
  onBack,
}: TeamFormationProps) {
  console.log("current project", project);

  const [selectedMembers, setSelectedMembers] = useState<{
    [key: string]: TeamMember;
  }>({});
  const [showRemovalDialog, setShowRemovalDialog] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<{
    role: string;
    member: TeamMember;
  } | null>(null);
  const [removalReason, setRemovalReason] = useState("");

  // Mock available team members
  const availableMembers: { [key: string]: TeamMember[] } = {
    "UI/UX Designer": [
      {
        id: "1",
        name: "Sarah Chen",
        role: "UI/UX Designer",
        experience: "Intermediate",
        rating: 4.8,
        completedProjects: 12,
        skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
        bio: "Passionate about creating user-centered designs with 3+ years of experience in digital products.",
      },
      {
        id: "2",
        name: "Alex Rivera",
        role: "UI/UX Designer",
        experience: "Beginner",
        rating: 4.5,
        completedProjects: 6,
        skills: ["Sketch", "InVision", "Wireframing", "User Testing"],
        bio: "Recent design bootcamp graduate eager to work on real-world projects and learn from experienced teams.",
      },
      {
        id: "3",
        name: "Jordan Kim",
        role: "UI/UX Designer",
        experience: "Advanced",
        rating: 4.9,
        completedProjects: 25,
        skills: [
          "Figma",
          "Adobe Creative Suite",
          "Design Systems",
          "Accessibility",
        ],
        bio: "Senior designer with expertise in enterprise design systems and accessibility standards.",
      },
    ],
    "Frontend Developer": [
      {
        id: "4",
        name: "Marcus Thompson",
        role: "Frontend Developer",
        experience: "Intermediate",
        rating: 4.7,
        completedProjects: 15,
        skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
        bio: "Full-stack developer specializing in React applications with a focus on performance and user experience.",
      },
      {
        id: "5",
        name: "Emily Watson",
        role: "Frontend Developer",
        experience: "Beginner",
        rating: 4.3,
        completedProjects: 8,
        skills: ["HTML", "CSS", "JavaScript", "Vue.js"],
        bio: "Junior developer passionate about clean code and modern frontend technologies.",
      },
    ],
    "Backend Developer": [
      {
        id: "6",
        name: "David Park",
        role: "Backend Developer",
        experience: "Advanced",
        rating: 4.9,
        completedProjects: 22,
        skills: ["Node.js", "Python", "PostgreSQL", "AWS"],
        bio: "Senior backend engineer with expertise in scalable architecture and cloud infrastructure.",
      },
      {
        id: "7",
        name: "Lisa Zhang",
        role: "Backend Developer",
        experience: "Intermediate",
        rating: 4.6,
        completedProjects: 11,
        skills: ["Express.js", "MongoDB", "Redis", "Docker"],
        bio: "Backend developer focused on API design and database optimization.",
      },
    ],
    "Mobile Developer": [
      {
        id: "8",
        name: "Ryan Foster",
        role: "Mobile Developer",
        experience: "Intermediate",
        rating: 4.5,
        completedProjects: 9,
        skills: ["React Native", "iOS", "Android", "Firebase"],
        bio: "Mobile developer experienced in cross-platform development and native iOS/Android apps.",
      },
    ],
  };

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

  const isTeamComplete = project?.skills?.every(
    (skill) => selectedMembers[skill]
  );

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
          onClick={onBack}
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
            onClick={onBack}
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

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Team Overview */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Team Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {project?.skills?.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          {getRoleIcon(skill)}
                          <span className="text-sm">{skill}</span>
                        </div>
                        {selectedMembers[skill] ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <div className="h-4 w-4 border-2 border-muted rounded-full" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Team Formation</span>
                      <span>
                        {Object.keys(selectedMembers)?.length}/
                        {project.skills?.length}
                      </span>
                    </div>
                    <div className="bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{
                          width: `${
                            (Object.keys(selectedMembers)?.length /
                              project.skills?.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  {isTeamComplete && (
                    <Button className="w-full" onClick={onTeamComplete}>
                      <Users className="h-4 w-4 mr-2" />
                      Complete Team Formation
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
                    {Object.entries(selectedMembers)?.map(([role, member]) => (
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
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Available Members */}
            <div className="lg:col-span-3 space-y-8">
              {project?.skills?.map((skill) => (
                <div key={skill}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(skill)}
                      <h2 className="text-xl">{skill}</h2>
                      {selectedMembers[skill] && (
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
                    {availableMembers[skill]?.map((member) => (
                      <Card
                        key={member.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedMembers[skill]?.id === member.id
                            ? "ring-2 ring-primary bg-primary/5"
                            : ""
                        }`}
                        onClick={() => handleSelectMember(skill, member)}
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
                            {selectedMembers[skill]?.id === member.id && (
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
                            {member.skills.slice(0, 3)?.map((skill, index) => (
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
