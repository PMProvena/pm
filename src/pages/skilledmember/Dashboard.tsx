import { useState } from "react";
import { Header } from "./components/skilled-member/Header";
import { ProjectCard } from "./components/skilled-member/ProjectCard";
import { TaskList } from "./components/skilled-member/TaskList";
import { PointsWidget } from "./components/skilled-member/PointsWidget";
import { NotificationPanel } from "./components/skilled-member/NotificationPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { BarChart3, Users, Target, Calendar } from "lucide-react";

// Mock data
const mockUser = {
  name: "Sarah Chen",
  role: "UI/UX Designer",
  avatar: "",
  points: 2450,
};

const mockProjects = [
  {
    id: "1",
    title: "FinTech Mobile Banking App",
    industry: "Financial Technology",
    status: "active" as const,
    progress: 65,
    currentMilestone: "User Interface Design & Prototyping",
    totalMilestones: 6,
    completedMilestones: 4,
    endDate: "Jan 15, 2025",
    teamMembers: [
      { name: "Alex Johnson", role: "PM", avatar: "" },
      { name: "Maria Garcia", role: "Frontend Dev", avatar: "" },
      { name: "David Kim", role: "Backend Dev", avatar: "" },
      { name: "Lisa Wang", role: "QA Engineer", avatar: "" },
    ],
    pmName: "Alex Johnson",
    pendingTasks: 2,
  },
  {
    id: "2",
    title: "E-commerce Platform Redesign",
    industry: "E-commerce",
    status: "active" as const,
    progress: 30,
    currentMilestone: "Market Research & User Analysis",
    totalMilestones: 8,
    completedMilestones: 2,
    endDate: "Feb 28, 2025",
    teamMembers: [
      { name: "John Smith", role: "PM", avatar: "" },
      { name: "Emma Brown", role: "Frontend Dev", avatar: "" },
      { name: "Tom Wilson", role: "Backend Dev", avatar: "" },
    ],
    pmName: "John Smith",
    pendingTasks: 1,
  },
];

const mockTasks = [
  {
    id: "1",
    title: "Create high-fidelity wireframes for dashboard",
    description:
      "Design detailed wireframes for the main dashboard interface including navigation, cards, and data visualization components",
    status: "in-progress" as const,
    dueDate: "Dec 18, 2024",
    projectName: "FinTech Mobile Banking App",
    milestoneNumber: 4,
    hasDeliverable: true,
    points: 150,
  },
  {
    id: "2",
    title: "User flow documentation",
    description:
      "Document the complete user journey from onboarding to key feature usage",
    status: "pending" as const,
    dueDate: "Dec 20, 2024",
    projectName: "FinTech Mobile Banking App",
    milestoneNumber: 4,
    hasDeliverable: true,
    points: 100,
  },
  {
    id: "3",
    title: "Competitive analysis report",
    description:
      "Research and analyze 5 key competitors in the e-commerce space",
    status: "pending" as const,
    dueDate: "Dec 22, 2024",
    projectName: "E-commerce Platform Redesign",
    milestoneNumber: 2,
    hasDeliverable: true,
    points: 120,
  },
  {
    id: "4",
    title: "Initial concept sketches",
    description: "Hand-drawn sketches of key interface concepts",
    status: "completed" as const,
    dueDate: "Dec 10, 2024",
    projectName: "FinTech Mobile Banking App",
    milestoneNumber: 3,
    hasDeliverable: true,
    points: 80,
  },
];

const mockNotifications = [
  {
    id: "1",
    type: "warning" as const,
    title: "Task Due Soon",
    message: "Your wireframe deliverable for FinTech project is due in 2 days",
    timestamp: "2 hours ago",
    read: false,
    actionRequired: true,
  },
  {
    id: "2",
    type: "success" as const,
    title: "Milestone Completed",
    message: "You've successfully completed Milestone 3 and earned 200 points!",
    timestamp: "1 day ago",
    read: false,
  },
  {
    id: "3",
    type: "info" as const,
    title: "New Team Member",
    message: "Lisa Wang (QA Engineer) has joined your FinTech project team",
    timestamp: "2 days ago",
    read: true,
  },
];

export default function SkilledMemberDashboard() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleTaskComplete = (taskId: string) => {
    console.log(`Marking task ${taskId} as complete`);
  };

  const handleUploadDeliverable = (taskId: string) => {
    console.log(`Uploading deliverable for task ${taskId}`);
  };

  const handleRequestPayout = () => {
    console.log("Requesting payout");
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleDismissNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={mockUser} notificationCount={unreadNotifications} />

      <main className="container mx-auto p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Projects
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockProjects.filter((p) => p.status === "active").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Tasks
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockTasks.filter((t) => t.status !== "completed").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Team Projects
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockProjects.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+350</div>
              <p className="text-xs text-muted-foreground">Points earned</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="points">Points & Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">
                        Completed wireframe review for FinTech project
                      </span>
                      <Badge variant="secondary" className="ml-auto">
                        +80 pts
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">
                        Started competitive analysis for E-commerce project
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">
                        Joined new project team: E-commerce Platform Redesign
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <TaskList
                  tasks={mockTasks.slice(0, 3)}
                  onTaskComplete={handleTaskComplete}
                  onUploadDeliverable={handleUploadDeliverable}
                />
              </div>

              <div className="space-y-6">
                <NotificationPanel
                  notifications={notifications}
                  onMarkAsRead={handleMarkAsRead}
                  onDismiss={handleDismissNotification}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Projects</h2>
              <Button>Browse Available Projects</Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Tasks</h2>
              <div className="flex gap-2">
                <Badge variant="outline">All Tasks ({mockTasks.length})</Badge>
                <Badge variant="outline">
                  Pending (
                  {mockTasks.filter((t) => t.status !== "completed").length})
                </Badge>
              </div>
            </div>
            <TaskList
              tasks={mockTasks}
              onTaskComplete={handleTaskComplete}
              onUploadDeliverable={handleUploadDeliverable}
            />
          </TabsContent>

          <TabsContent value="points" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Points & Rewards</h2>
            </div>
            <PointsWidget
              totalPoints={mockUser.points}
              monthlyPoints={350}
              pointsGrowth={23}
              nextRewardThreshold={500}
              canRequestPayout={mockUser.points >= 1000}
              onRequestPayout={handleRequestPayout}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
