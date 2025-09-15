import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Users, FolderOpen, UserCheck, Award, TrendingUp, AlertCircle } from "lucide-react";

const stats = [
  {
    title: "Active PMs",
    value: "324",
    change: "+12%",
    icon: Users,
    color: "text-blue-600"
  },
  {
    title: "Active Projects",
    value: "89",
    change: "+8%",
    icon: FolderOpen,
    color: "text-green-600"
  },
  {
    title: "Mentors",
    value: "156",
    change: "+5%",
    icon: UserCheck,
    color: "text-purple-600"
  },
  {
    title: "Points Earned",
    value: "45,230",
    change: "+15%",
    icon: Award,
    color: "text-yellow-600"
  }
];

const recentActivities = [
  {
    id: 1,
    type: "Team Removal Request",
    description: "PM Sarah Chen requested to remove UI/UX designer from FinTech project",
    time: "2 hours ago",
    status: "pending"
  },
  {
    id: 2,
    type: "Project Completed",
    description: "E-commerce Analytics project completed by Team Alpha",
    time: "4 hours ago",
    status: "completed"
  },
  {
    id: 3,
    type: "Mentor Assignment",
    description: "John Smith assigned as mentor to Healthcare Innovation project",
    time: "6 hours ago",
    status: "completed"
  },
  {
    id: 4,
    type: "Payment Request",
    description: "Mentor Lisa Wong requested point conversion (2,400 points)",
    time: "1 day ago",
    status: "pending"
  }
];

const projectProgress = [
  { industry: "FinTech", active: 23, completed: 45, progress: 66 },
  { industry: "Healthcare", active: 18, completed: 32, progress: 58 },
  { industry: "E-commerce", active: 15, completed: 28, progress: 54 },
  { industry: "EdTech", active: 12, completed: 19, progress: 48 },
  { industry: "SaaS", active: 21, completed: 38, progress: 62 }
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor platform activity and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                  {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {activity.status === "pending" ? (
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                    ) : (
                      <div className="h-5 w-5 bg-green-600 rounded-full flex items-center justify-center">
                        <div className="h-2 w-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">
                        {activity.type}
                      </p>
                      <Badge 
                        variant={activity.status === "pending" ? "secondary" : "default"}
                        className="ml-2"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Progress by Industry */}
        <Card>
          <CardHeader>
            <CardTitle>Project Progress by Industry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectProgress.map((project) => (
                <div key={project.industry} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{project.industry}</span>
                    <span className="text-sm text-muted-foreground">
                      {project.active} active, {project.completed} completed
                    </span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}