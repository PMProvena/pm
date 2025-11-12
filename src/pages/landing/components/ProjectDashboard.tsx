/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileText,
  MessageSquare,
  Star,
  Target,
  Upload,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { useGetMyProjects } from "@/hooks/projects/useGetMyProjects";

interface Milestone {
  id: string;
  title: string;
  description: string;
  week: number;
  status:
    | "pending"
    | "in-progress"
    | "submitted"
    | "approved"
    | "needs-revision";
  dueDate: string;
  deliverables: string[];
  feedback?: string;
  mentorRating?: number;
}

// interface ProjectDashboardProps {
//   project: Project;
//   onBack: () => void;
// }

export function ProjectDashboard() {
  const { data: MyProjects, isPending: isMyProjectsLoading } =
    useGetMyProjects();
  console.log("MyProjects", MyProjects);

  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state?.project;
  console.log("current project", project);

  const [activeTab, setActiveTab] = useState("milestones");
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(
    null
  );
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadNotes, setUploadNotes] = useState("");

  // Mock milestones data
  // const milestones: Milestone[] = [
  //   {
  //     id: "1",
  //     title: "Project Discovery & Research",
  //     description:
  //       "Conduct market research, user interviews, and competitive analysis to understand the problem space.",
  //     week: 1,
  //     status: "approved",
  //     dueDate: "2025-01-20",
  //     deliverables: [
  //       "Market Research Report",
  //       "User Interview Insights",
  //       "Competitive Analysis",
  //     ],
  //     feedback:
  //       "Excellent comprehensive research! Your user personas are well-defined and the competitive analysis shows deep understanding of the market.",
  //     mentorRating: 5,
  //   },
  //   {
  //     id: "2",
  //     title: "Problem Definition & Solution Framework",
  //     description:
  //       "Define the core problem, success metrics, and outline potential solution approaches.",
  //     week: 2,
  //     status: "in-progress",
  //     dueDate: "2025-01-27",
  //     deliverables: [
  //       "Problem Statement",
  //       "Success Metrics Definition",
  //       "Solution Framework",
  //     ],
  //   },
  //   {
  //     id: "3",
  //     title: "Feature Prioritization & Roadmap",
  //     description:
  //       "Create feature requirements, prioritize based on impact/effort, and develop product roadmap.",
  //     week: 3,
  //     status: "pending",
  //     dueDate: "2025-02-03",
  //     deliverables: [
  //       "Feature Requirements Document",
  //       "Prioritization Matrix",
  //       "Product Roadmap",
  //     ],
  //   },
  //   {
  //     id: "4",
  //     title: "Design & Prototyping",
  //     description:
  //       "Collaborate with design team to create wireframes, user flows, and interactive prototypes.",
  //     week: 4,
  //     status: "pending",
  //     dueDate: "2025-02-10",
  //     deliverables: [
  //       "User Flow Diagrams",
  //       "Wireframes",
  //       "Interactive Prototype",
  //     ],
  //   },
  //   {
  //     id: "5",
  //     title: "Development Planning & Coordination",
  //     description:
  //       "Work with engineering team to break down features, estimate effort, and plan sprints.",
  //     week: 5,
  //     status: "pending",
  //     dueDate: "2025-02-17",
  //     deliverables: [
  //       "Technical Requirements",
  //       "Sprint Planning",
  //       "Development Timeline",
  //     ],
  //   },
  //   {
  //     id: "6",
  //     title: "Testing, Launch & Retrospective",
  //     description:
  //       "Define testing strategy, coordinate launch activities, and conduct project retrospective.",
  //     week: 6,
  //     status: "pending",
  //     dueDate: "2025-02-24",
  //     deliverables: [
  //       "Testing Plan",
  //       "Launch Checklist",
  //       "Project Retrospective",
  //     ],
  //   },
  // ];

  // after const project = location.state?.project;
  const myProjectsData = (MyProjects as any)?.data
    ? Object.values((MyProjects as any).data)
    : [];

  // find the full project details from MyProjects that match the current project _id
  const matchedProject = myProjectsData.find(
    (p: any) => p._id === project?._id
  );

  // use the milestones from MyProjects if found, otherwise fallback to mock
  const milestones =
    (matchedProject as any)?.milestones?.length > 0
      ? (matchedProject as any).milestones.map((m: any) => ({
          id: m.id?.toString(),
          title: m.title,
          description: m.description,
          week: m.week,
          status: m.status,
          dueDate: m.due_date,
          deliverables: m.deliverables,
          feedback: m.mentor_feedback,
          mentorRating: m.rating,
        }))
      : "No milestones";

  // const teamMembers = [
  //   { name: "Sarah Chen", role: "UI/UX Designer", avatar: "SC" },
  //   { name: "Marcus Thompson", role: "Frontend Developer", avatar: "MT" },
  //   { name: "David Park", role: "Backend Developer", avatar: "DP" },
  // ];

  const mentor = {
    name: "Jennifer Martinez",
    role: "Senior Product Manager",
    company: "TechCorp",
    avatar: "JM",
    rating: 4.9,
    experience: "8+ years",
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "needs-revision":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "submitted":
        return <Upload className="h-4 w-4" />;
      case "in-progress":
        return <Clock className="h-4 w-4" />;
      case "needs-revision":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const completedMilestones = milestones.filter(
    (m: any) => m.status === "approved"
  ).length;
  const progressPercentage = (completedMilestones / milestones.length) * 100;

  const handleMilestoneClick = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    if (milestone.status === "in-progress") {
      setShowUploadDialog(true);
    }
  };

  const handleUploadDeliverable = () => {
    if (selectedMilestone) {
      // Update milestone status to submitted
      setShowUploadDialog(false);
      setUploadNotes("");
      setSelectedMilestone(null);
      // In real app, this would update the milestone status
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            // onClick={() => navigate("/build-your-team")}
            className="mb-6 cursor-pointer"
          >
            ← Back to Dashboard
          </Button>

          {isMyProjectsLoading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <>
              {/* Project Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl mb-2">{project.title}</h1>
                    <p className="text-muted-foreground">
                      {project.industry} • {project.duration}
                    </p>
                  </div>
                  <Badge
                    className={`${
                      project.difficulty === "Beginner"
                        ? "bg-green-100 text-green-800"
                        : project.difficulty === "Intermediate"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {project.difficulty}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Target className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Progress
                          </p>
                          <p className="text-lg">
                            {completedMilestones}/{milestones.length}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Week</p>
                          <p className="text-lg">
                            {" "}
                            {completedMilestones} of{" "}
                            {parseInt(project.duration.split(" ")[0])}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Team</p>
                          <p className="text-lg">{project.teamSize}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Points
                          </p>
                          <p className="text-lg">
                            {project.pointsEarned || "--"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{Math.round(progressPercentage)}% Complete</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="milestones">Milestones</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="mentor">Mentor</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>

                <TabsContent value="milestones" className="space-y-6">
                  <div className="space-y-4">
                    {milestones.map((milestone: any) => (
                      <Card
                        key={milestone.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          milestone.status === "in-progress"
                            ? "ring-2 ring-primary"
                            : ""
                        }`}
                        onClick={() => handleMilestoneClick(milestone)}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="text-sm text-muted-foreground">
                                  Week {milestone.week}
                                </span>
                                <Badge
                                  className={getStatusColor(milestone.status)}
                                >
                                  <div className="flex items-center space-x-1">
                                    {getStatusIcon(milestone.status)}
                                    <span className="capitalize">
                                      {milestone.status.replace("-", " ")}
                                    </span>
                                  </div>
                                </Badge>
                              </div>
                              <CardTitle className="text-lg">
                                {milestone.title}
                              </CardTitle>
                              <CardDescription className="mt-1">
                                {milestone.description}
                              </CardDescription>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Due:{" "}
                              {new Date(milestone.dueDate).toLocaleDateString()}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-sm mb-2">Deliverables:</h4>
                              <div className="flex flex-wrap gap-2">
                                {milestone.deliverables.map(
                                  (deliverable: any, index: number) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {deliverable}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>

                            {milestone.feedback && (
                              <div className="bg-green-50 p-3 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <MessageSquare className="h-4 w-4 text-green-600" />
                                  <span className="text-sm text-green-800">
                                    Mentor Feedback
                                  </span>
                                  {milestone.mentorRating && (
                                    <div className="flex items-center space-x-1">
                                      {[...Array(milestone.mentorRating)].map(
                                        (_, i) => (
                                          <Star
                                            key={i}
                                            className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                          />
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                                <p className="text-sm text-green-700">
                                  {milestone.feedback}
                                </p>
                              </div>
                            )}

                            {milestone.status === "in-progress" && (
                              <Button className="w-full">
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Deliverables
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="team" className="space-y-6">
                  {/* {teamMembers.map((member, index) => ( */}
                  {project.assignedUsers && project.assignedUsers.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {project.assignedUsers.map(
                        (member: any, index: number) => (
                          <Card key={index}>
                            <CardHeader>
                              <div className="flex items-center space-x-3">
                                <Avatar>
                                  <AvatarFallback>
                                    {member.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-lg">
                                    {member.name}
                                  </CardTitle>
                                  <CardDescription>
                                    {member.role}
                                  </CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <Button variant="outline" className="w-full">
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Message
                                </Button>
                                <div className="text-sm text-muted-foreground">
                                  <p>• Completed Week 1 deliverables</p>
                                  <p>• Currently working on Week 2 tasks</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      )}
                    </div>
                  ) : (
                    <p>No Team Members Yet</p>
                  )}
                </TabsContent>

                <TabsContent value="mentor" className="space-y-6">
                  {project.assignedUsers && project.assignedUsers.length > 0 ? (
                    <Card>
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-16 w-16">
                            <AvatarFallback className="text-lg">
                              {mentor.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-xl">
                              {mentor.name}
                            </CardTitle>
                            <CardDescription className="text-base">
                              {mentor.role} at {mentor.company}
                            </CardDescription>
                            <div className="flex items-center space-x-2 mt-2">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm">{mentor.rating}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                • {mentor.experience}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Jennifer is a seasoned Product Manager with expertise
                          in e-commerce and mobile applications. She has
                          successfully launched multiple products and mentored
                          over 50 aspiring PMs.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                          <Button>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Send Message
                          </Button>
                          <Button variant="outline">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule 1:1
                          </Button>
                        </div>

                        <div className="bg-muted/30 p-3 rounded-lg">
                          <h4 className="text-sm mb-2">Recent Feedback</h4>
                          <p className="text-sm text-muted-foreground">
                            "Great work on the market research! Your user
                            personas are well-defined and show deep
                            understanding of the target audience."
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <p>No Mentor Yet</p>
                  )}
                </TabsContent>

                <TabsContent value="resources" className="space-y-6">
                  {project.assignedUsers && project.assignedUsers.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Project Templates</CardTitle>
                          <CardDescription>
                            Download helpful templates for your deliverables
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {[
                            "User Research Template",
                            "PRD Template",
                            "Competitive Analysis Framework",
                            "Feature Prioritization Matrix",
                          ].map((template, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 border rounded"
                            >
                              <span className="text-sm">{template}</span>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Learning Resources</CardTitle>
                          <CardDescription>
                            Recommended articles and guides
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {[
                            "How to Conduct User Research",
                            "Writing Effective PRDs",
                            "Feature Prioritization Best Practices",
                            "Working with Design Teams",
                          ].map((resource, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 border rounded"
                            >
                              <span className="text-sm">{resource}</span>
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <p>No Resources Yet</p>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Deliverables</DialogTitle>
            <DialogDescription>
              Upload your completed deliverables for {selectedMilestone?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Deliverables</Label>
              {selectedMilestone?.deliverables.map((deliverable, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded mt-2"
                >
                  <span className="text-sm">{deliverable}</span>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              ))}
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional context or notes for your mentor..."
                value={uploadNotes}
                onChange={(e) => setUploadNotes(e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowUploadDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleUploadDeliverable}>
                Submit for Review
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
