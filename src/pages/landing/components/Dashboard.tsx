import { useGetDashboard } from "@/hooks/projects/useGetDashboard";
import {
  Award,
  Bell,
  BookOpen,
  MessageSquare,
  Plus,
  Settings,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Error from "./error/Error";
import DashboardSkeletonLoader from "./loader/DashboardSkeletonLoader";
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
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Dashboard() {
  const user = JSON.parse(localStorage?.getItem("userDetails") || "null");
  console.log("user", user);
  // export function Dashboard({ user, currentProject, onStartNewProject }: DashboardProps) {
  const nav = useNavigate();

  const { data, isPending, isError, refetch: refetchData } = useGetDashboard();
  console.log("data", data);

  // const { data: MyProjects } = useGetMyProjects();
  // console.log("MyProjects", MyProjects);

  const myProjectsArray = data?.data?.myProjects
    ? Object.values(data.data.myProjects)
    : [];
  console.log("myProjectsArray", myProjectsArray);

  const currentProject = myProjectsArray[1] ?? null;

  const completedMilestones = currentProject?.milestonesCompleted ?? 0;

  const totalMilestones =
    typeof currentProject?.milestones === "number"
      ? currentProject.milestones
      : Array.isArray(currentProject?.milestones)
      ? currentProject.milestones.length
      : 0;

  console.log("Dashboard data:", data);
  console.log("currentProject", currentProject);

  const [activeTab, setActiveTab] = useState("overview");

  // Replace your old mock stats with this
  const stats = {
    totalProjects: data?.data?.projects ?? 0,
    completedMilestones: data?.data?.milestones?.completed ?? 0,
    totalMilestones: data?.data?.milestones?.total ?? 0,
    points: data?.data?.pointsEarned?.value ?? 0,
    certificatesEarned: data?.data?.certificates ?? 0,
    profileCompletion: data?.data?.profileCompletion ?? 0,
    pointsPeriod: data?.data?.pointsEarned?.period ?? "",
    pointsValue: data?.data?.pointsEarned?.value ?? 0,
    activeProjects: data?.data?.activeProjects ?? 0,
  };

  // Same with these
  const notifications = data?.data.notifications?.length
    ? data.data.notifications
    : [];

  const recentActivity = data?.data.recentActivity?.length
    ? data.data.recentActivity
    : [];

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const totalProjects = data?.data?.projects ?? 0;
    const myProjects = data?.data?.myProjects ?? [];

    if (!isPending && totalProjects === 0 && myProjects.length === 0) {
      nav("/projects");
    }
  }, [data, isPending, nav]);

  useEffect(() => {
    if (activeTab === "project" && currentProject) {
      if (currentProject.assignedUsers?.length) {
        nav("/project-phase", { state: { project: currentProject } });
      } else {
        nav("/build-your-team", { state: { project: currentProject } });
      }
    }
  }, [activeTab, currentProject, nav]);

  if (isError) return <Error refetchData={refetchData} />;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary-foreground" />
                </div>
                {/* <img
                  src="/pngs/logo.png"
                  alt="logo"
                  className="w-20 h-20 object-contain"
                /> */}
                <span className="text-xl font-semibold">PM Experience</span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-lg">Dashboard</h1>
            </div>

            <div
              className="flex items-center space-x-4 relative"
              ref={dropdownRef}
            >
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative cursor-pointer"
              >
                <Bell className="h-5 w-5" />
                {/* {notifications.some((n) => n.unread) && (
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full"></div>
                )} */}
              </Button>

              {/* Settings */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="cursor-pointer"
                >
                  <Settings className="h-5 w-5" />
                </Button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-md z-10">
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        localStorage.removeItem("userDetails");
                        localStorage.removeItem("pmUserToken");
                        nav("/");
                        toast.success("Logged out successfully!");
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>

              {/* Avatar */}
              <Avatar>
                <AvatarFallback>
                  {user
                    ? `${user.data.firstName?.[0] ?? ""}${
                        user.data.lastName?.[0] ?? ""
                      }`.toUpperCase()
                    : "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {isPending ? (
        <DashboardSkeletonLoader />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="text-lg">
                        {user
                          ? `${user.data.firstName?.[0] ?? ""}${
                              user.data.lastName?.[0] ?? ""
                            }`.toUpperCase()
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {user
                          ? `${user.data.firstName || user.data.firstname} ${
                              user.data.lastName || user.data.lastname
                            }`
                          : "Guest"}
                      </CardTitle>
                      <CardDescription className="uppercase">
                        {user?.data.role ?? "—"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Profile Completion</span>
                      <span>{stats.profileCompletion}%</span>
                    </div>
                    <Progress value={stats.profileCompletion} className="h-2" />
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Points
                      </span>
                      <Badge variant="outline">{stats.points}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Projects
                      </span>
                      <Badge variant="outline">{stats.totalProjects}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Certificates
                      </span>
                      <Badge variant="outline">
                        {stats.certificatesEarned}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start cursor-pointer"
                    variant="outline"
                    onClick={() => nav("/projects")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Start New Project
                  </Button>
                  <Button
                    className="w-full justify-start cursor-pointer"
                    variant="outline"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Portfolio
                  </Button>
                  <Button
                    className="w-full justify-start cursor-pointer"
                    variant="outline"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message Mentor
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="project">Current Project</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="teamMembers">Team Members</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm">
                          Active Projects
                        </CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl">
                          {data.data.activeProjects ?? 0}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {currentProject
                            ? "In progress"
                            : "No active projects"}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm">
                          Milestones Completed
                        </CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl">
                          {stats.completedMilestones}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Of {stats.totalMilestones} total
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm">Points Earned</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl">{stats.points}</div>
                        <p className="text-xs text-muted-foreground">
                          This month
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Current Project Status */}
                  {currentProject && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Current Project</CardTitle>
                        <CardDescription>
                          Your active project progress
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg mb-1 capitalize">
                              {currentProject.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {currentProject.industry}
                            </p>
                            <Badge variant="outline" className="mt-2">
                              {currentProject.difficulty}
                            </Badge>
                          </div>
                          <Button
                            onClick={() => {
                              if (currentProject?.assignedUsers?.length) {
                                nav("/project-phase", {
                                  state: { project: currentProject },
                                });
                              } else {
                                nav("/build-your-team", {
                                  state: { project: currentProject },
                                });
                              }
                            }}
                            className="cursor-pointer"
                          >
                            {currentProject?.assignedUsers?.length
                              ? "View Project"
                              : "Build Your Team"}
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>
                              {completedMilestones}/{totalMilestones}
                            </span>
                          </div>
                          <Progress
                            value={
                              totalMilestones > 0
                                ? (completedMilestones / totalMilestones) * 100
                                : 0
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {!currentProject && (
                    <Card>
                      <CardHeader>
                        <CardTitle>No Active Project</CardTitle>
                        <CardDescription>
                          Start your first project to begin your PM journey.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center py-8">
                        <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">
                          You currently have no active projects.
                        </p>
                        <Button
                          onClick={() => nav("/projects")}
                          className="cursor-pointer"
                        >
                          <Plus className="h-4 w-4 mr-2 " />
                          Browse Projects
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                  {/* Current Project Status */}

                  {/* Recent Activity  & Notifications  */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Recent Activity
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {recentActivity.length > 0 ? (
                          recentActivity.map((activity, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-3"
                            >
                              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                              <div className="flex-1">
                                <p className="text-sm">{activity.message}</p>
                                <p className="text-xs text-muted-foreground">
                                  {activity.timeAgo}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No recent activity
                          </p>
                        )}
                      </CardContent>
                    </Card>

                    {/* Notifications */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Notifications
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {notifications.length > 0 ? (
                          notifications.map((notification, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-3"
                            >
                              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                              <div className="flex-1">
                                <p className="text-sm">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {notification.timeAgo}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No notifications
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Current Project Tab*/}
                <TabsContent value="project" className="space-y-6">
                  {!currentProject && (
                    <Card>
                      <CardHeader>
                        <CardTitle>No Active Project</CardTitle>
                        <CardDescription>
                          Start your first project to begin your PM journey.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center my-12 space-y-2">
                        <Target className="h-12 w-12 text-muted-foreground mx-auto" />
                        <p className="text-muted-foreground">
                          You currently have no active projects.
                        </p>
                        <Button
                          onClick={() => nav("/projects")}
                          className="cursor-pointer mt-2"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Browse Projects
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                  {/* {currentProject ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>Project Workspace</CardTitle>
                        <CardDescription>
                          Manage your current project and team
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg mb-1">
                                {currentProject.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {currentProject.industry}
                              </p>
                              <p className="text-sm">
                                {currentProject.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex space-x-4">
                            <Button
                              onClick={() => setProjectPhase("team-formation")}
                            >
                              <Users className="h-4 w-4 mr-2" />
                              Manage Team
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setProjectPhase("active")}
                            >
                              <Calendar className="h-4 w-4 mr-2" />
                              View Milestones
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    // )
                    <Card>
                      <CardHeader>
                        <CardTitle>No Active Project</CardTitle>
                        <CardDescription>
                          Start your first project to begin your PM journey.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center my-12 space-y-2">
                        <Target className="h-12 w-12 text-muted-foreground mx-auto " />
                        <p className="text-muted-foreground">
                          You currently have no active projects.
                        </p>
                        <Button
                          onClick={() => nav("/projects")}
                          className="cursor-pointer mt-2"
                        >
                          <Plus className="h-4 w-4 mr-2 " />
                          Browse Projects
                        </Button>
                      </CardContent>
                    </Card>
                  )} */}
                </TabsContent>

                {/* Projects Tab */}
                <TabsContent value="projects" className="space-y-6">
                  {myProjectsArray.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                      {myProjectsArray.map((project) => {
                        const completedMilestones =
                          project.milestonesCompleted ?? 0;

                        const totalMilestones =
                          typeof project.milestones === "number"
                            ? project.milestones
                            : Array.isArray(project.milestones)
                            ? project.milestones.length
                            : 0;

                        const progress =
                          totalMilestones > 0
                            ? (completedMilestones / totalMilestones) * 100
                            : 0;

                        return (
                          <Card key={project._id}>
                            <CardHeader>
                              <CardTitle className="capitalize">{project.title}</CardTitle>
                              <CardDescription>
                                Your project progress
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-lg mb-1 capitalize">
                                    {project.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {project.industry}
                                  </p>
                                  <Badge variant="outline" className="mt-2">
                                    {project.difficulty}
                                  </Badge>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Progress</span>
                                  <span>
                                    {completedMilestones}/{totalMilestones}{" "}
                                    milestones
                                  </span>
                                </div>
                               <Progress value={progress} className="h-2" />
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <Card>
                      <CardHeader>
                        <CardTitle>No Projects Yet</CardTitle>
                        <CardDescription>
                          You currently have no projects assigned or created.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center py-12 space-y-2">
                        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto" />
                        <p className="text-muted-foreground">
                          Start your first project to see it listed here.
                        </p>
                        <Button
                          variant="outline"
                          className="mt-2 cursor-pointer"
                          onClick={() => nav("/projects")}
                        >
                          Browse Projects
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {/* Team Members Tab */}
                <TabsContent value="teamMembers" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Team Members</CardTitle>
                      <CardDescription>
                        Collaborate with your teammates
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12 space-y-2">
                        <Users className="h-12 w-12 text-muted-foreground mx-auto" />
                        <h3 className="text-lg font-medium">
                          No Team Members Yet
                        </h3>
                        <p className="text-muted-foreground">
                          Once your team members have been added and approved,
                          they will appear here.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
