import {
  Award,
  Bell,
  BookOpen,
  Calendar,
  MessageSquare,
  Plus,
  Settings,
  Target,
  Trophy,
  User,
  Users
} from "lucide-react";
import { useState } from "react";
import { ProjectDashboard } from "./ProjectDashboard";
import { TeamFormation } from "./TeamFormation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  hasCompletedOnboarding: boolean;
}

interface Project {
  id: string;
  title: string;
  industry: string;
  description: string;
  duration: string;
  price: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  skills: string[];
  milestones: number;
  teamSize: number;
  icon: React.ReactNode;
  objectives: string[];
}

interface DashboardProps {
  user: User;
  currentProject: Project | null;
  onStartNewProject: () => void;
}

export function Dashboard({ user, currentProject, onStartNewProject }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [projectPhase, setProjectPhase] = useState<'team-formation' | 'active' | 'completed'>('team-formation');

  // Mock data for demonstration
  const stats = {
    totalProjects: 1,
    completedMilestones: currentProject ? 0 : 0,
    totalMilestones: currentProject?.milestones || 0,
    points: 0,
    certificatesEarned: 0
  };

  const notifications = [
    {
      id: '1',
      type: 'team',
      message: 'Your team formation is pending approval',
      time: '2 hours ago',
      unread: true
    },
    {
      id: '2',
      type: 'mentor',
      message: 'Welcome to PM Experience! Your mentor will be assigned soon.',
      time: '1 day ago',
      unread: true
    }
  ];

  const recentActivity = [
    {
      id: '1',
      action: 'Project Started',
      description: currentProject?.title || 'No active project',
      time: '2 hours ago',
      type: 'project'
    },
    {
      id: '2',
      action: 'Account Created',
      description: 'Welcome to PM Experience!',
      time: '1 day ago',
      type: 'account'
    }
  ];

  if (activeTab === 'project' && currentProject) {
    if (projectPhase === 'team-formation') {
      return (
        <TeamFormation
          project={currentProject}
          onTeamComplete={() => setProjectPhase('active')}
          onBack={() => setActiveTab('overview')}
        />
      );
    }

    if (projectPhase === 'active') {
      return (
        <ProjectDashboard
          project={currentProject}
          onBack={() => setActiveTab('overview')}
        />
      );
    }
  }

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
                <span className="text-xl font-semibold">PM Experience</span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-lg">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications.some(n => n.unread) && (
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full"></div>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarFallback>
                  {user.firstName[0]}{user.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="text-lg">
                      {user.firstName[0]}{user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{user.firstName} {user.lastName}</CardTitle>
                    <CardDescription className="capitalize">{user.role.replace('-', ' ')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Profile Completion</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Points</span>
                    <Badge variant="outline">{stats.points}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Projects</span>
                    <Badge variant="outline">{stats.totalProjects}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Certificates</span>
                    <Badge variant="outline">{stats.certificatesEarned}</Badge>
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
                <Button className="w-full justify-start" variant="outline" onClick={onStartNewProject}>
                  <Plus className="h-4 w-4 mr-2" />
                  Start New Project
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Portfolio
                </Button>
                <Button className="w-full justify-start" variant="outline">
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
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Active Projects</CardTitle>
                      <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl">{currentProject ? 1 : 0}</div>
                      <p className="text-xs text-muted-foreground">
                        {currentProject ? 'In progress' : 'No active projects'}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm">Milestones Completed</CardTitle>
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl">{stats.completedMilestones}</div>
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
                      <CardDescription>Your active project progress</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg mb-1">{currentProject.title}</h3>
                          <p className="text-sm text-muted-foreground">{currentProject.industry}</p>
                          <Badge variant="outline" className="mt-2">{currentProject.difficulty}</Badge>
                        </div>
                        <Button onClick={() => setActiveTab('project')}>
                          View Project
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{stats.completedMilestones}/{stats.totalMilestones} milestones</span>
                        </div>
                        <Progress 
                          value={(stats.completedMilestones / stats.totalMilestones) * 100} 
                          className="h-2" 
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {!currentProject && (
                  <Card>
                    <CardHeader>
                      <CardTitle>No Active Project</CardTitle>
                      <CardDescription>Start your PM journey today</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Choose from our curated selection of real-world projects to begin building your product management experience.
                      </p>
                      <Button onClick={onStartNewProject}>
                        <Plus className="h-4 w-4 mr-2" />
                        Browse Projects
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Recent Activity */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-primary' : 'bg-muted'}`}></div>
                          <div className="flex-1">
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="project" className="space-y-6">
                {currentProject ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Workspace</CardTitle>
                      <CardDescription>Manage your current project and team</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg mb-1">{currentProject.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{currentProject.industry}</p>
                            <p className="text-sm">{currentProject.description}</p>
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          <Button onClick={() => setProjectPhase('team-formation')}>
                            <Users className="h-4 w-4 mr-2" />
                            Manage Team
                          </Button>
                          <Button variant="outline" onClick={() => setProjectPhase('active')}>
                            <Calendar className="h-4 w-4 mr-2" />
                            View Milestones
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>No Active Project</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">You don't have any active projects yet.</p>
                      <Button onClick={onStartNewProject}>Start New Project</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio</CardTitle>
                    <CardDescription>Your completed projects and case studies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg mb-2">No Portfolio Items Yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Complete your first project to generate your portfolio case study
                      </p>
                      <Button variant="outline" onClick={onStartNewProject}>
                        Start Your First Project
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mentorship" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mentorship</CardTitle>
                    <CardDescription>Connect with your assigned mentor</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg mb-2">Mentor Assignment Pending</h3>
                      <p className="text-muted-foreground mb-4">
                        Your mentor will be assigned once you start your first project
                      </p>
                      <Button variant="outline" onClick={onStartNewProject}>
                        Start Project to Get Mentor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}