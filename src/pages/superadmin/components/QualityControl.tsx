/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Eye,
  FileText,
  MessageSquare,
  Star
} from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";

const qualityMetrics = [
  { title: "On-Time Deliveries", value: "89%", change: "+5%", icon: Clock, color: "text-green-600" },
  { title: "Quality Score Avg", value: "4.2/5", change: "+0.3", icon: Star, color: "text-yellow-600" },
  { title: "At-Risk Projects", value: "8", change: "-2", icon: AlertTriangle, color: "text-red-600" },
  { title: "Completed This Month", value: "23", change: "+12", icon: CheckCircle, color: "text-blue-600" }
];

const projectDeliverables = [
  {
    id: 1,
    projectTitle: "Mobile Payment App",
    pmName: "Sarah Chen",
    week: 3,
    milestone: "MVP Definition & Design",
    deliverables: [
      { name: "MVP Specification", status: "submitted", quality: 4.5, reviewer: "John Smith" },
      { name: "User Journey", status: "submitted", quality: 4.2, reviewer: "John Smith" },
      { name: "Wireframes", status: "pending", quality: null, reviewer: null }
    ],
    overallStatus: "in-review",
    dueDate: "2024-03-15",
    submittedDate: "2024-03-14"
  },
  {
    id: 2,
    projectTitle: "Healthcare Dashboard",
    pmName: "Mike Johnson",
    week: 2,
    milestone: "Solution Ideation & Validation",
    deliverables: [
      { name: "Solution Concepts", status: "approved", quality: 4.8, reviewer: "Maria Garcia" },
      { name: "User Feedback", status: "submitted", quality: 3.9, reviewer: "Maria Garcia" },
      { name: "Technical Feasibility", status: "revision-needed", quality: 3.2, reviewer: "Maria Garcia" }
    ],
    overallStatus: "revision-needed",
    dueDate: "2024-03-12",
    submittedDate: "2024-03-11"
  },
  {
    id: 3,
    projectTitle: "E-commerce Analytics",
    pmName: "Emily Davis",
    week: 4,
    milestone: "Development Planning",
    deliverables: [
      { name: "Technical Architecture", status: "approved", quality: 4.6, reviewer: "David Brown" },
      { name: "Development Timeline", status: "approved", quality: 4.4, reviewer: "David Brown" },
      { name: "Resource Plan", status: "approved", quality: 4.3, reviewer: "David Brown" }
    ],
    overallStatus: "approved",
    dueDate: "2024-03-10",
    submittedDate: "2024-03-09"
  }
];

const atRiskProjects = [
  {
    id: 1,
    title: "Mobile Banking App",
    pmName: "Alex Rodriguez",
    week: 2,
    totalWeeks: 6,
    issue: "Multiple deliverables consistently late",
    severity: "high",
    mentor: "John Smith",
    lastUpdate: "2 days ago"
  },
  {
    id: 2,
    title: "Patient Portal Redesign",
    pmName: "Jennifer Kim",
    week: 4,
    totalWeeks: 8,
    issue: "Team member conflicts affecting progress",
    severity: "medium",
    mentor: "Lisa Wong",
    lastUpdate: "1 day ago"
  },
  {
    id: 3,
    title: "Learning Management Platform",
    pmName: "Robert Wilson",
    week: 3,
    totalWeeks: 7,
    issue: "Quality of deliverables below standards",
    severity: "high",
    mentor: "Maria Garcia",
    lastUpdate: "6 hours ago"
  }
];

export function QualityControl() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  console.log("Selected Project:", selectedProject);
  const [interventionNote, setInterventionNote] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "default";
      case "submitted": return "secondary";
      case "in-review": return "secondary";
      case "revision-needed": return "destructive";
      case "pending": return "outline";
      default: return "secondary";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "default";
      default: return "secondary";
    }
  };

  const handleIntervention = (projectId: number) => {
    console.log(`Intervening in project ${projectId} with note: ${interventionNote}`);
    setInterventionNote("");
    setSelectedProject(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Quality Control</h1>
        <p className="text-muted-foreground">Monitor deliverables, track quality scores, and manage at-risk projects</p>
      </div>

      {/* Quality Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {qualityMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className={`flex items-center text-xs ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change} from last month
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="deliverables" className="space-y-4">
        <TabsList>
          <TabsTrigger value="deliverables">Project Deliverables</TabsTrigger>
          <TabsTrigger value="at-risk">At-Risk Projects ({atRiskProjects.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="deliverables">
          <div className="space-y-6">
            {projectDeliverables.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.projectTitle}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        PM: {project.pmName} • Week {project.week} • {project.milestone}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(project.overallStatus)}>
                        {project.overallStatus}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        Due: {project.dueDate}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.deliverables.map((deliverable, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{deliverable.name}</p>
                            {deliverable.reviewer && (
                              <p className="text-xs text-muted-foreground">
                                Reviewed by {deliverable.reviewer}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {deliverable.quality && (
                            <div className="flex items-center">
                              <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{deliverable.quality}</span>
                            </div>
                          )}
                          <Badge variant={getStatusColor(deliverable.status)}>
                            {deliverable.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Submitted: {project.submittedDate}</span>
                      <span>•</span>
                      <span>Due: {project.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-3 w-3" />
                        Download All
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-1 h-3 w-3" />
                        Add Feedback
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="at-risk">
          <Card>
            <CardHeader>
              <CardTitle>At-Risk Projects Requiring Intervention</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {atRiskProjects.map((project) => (
                  <Card key={project.id} className="border-l-4 border-l-red-500">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{project.title}</h4>
                            <Badge variant={getSeverityColor(project.severity)}>
                              {project.severity} priority
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-sm text-muted-foreground">PM: {project.pmName}</p>
                              <p className="text-sm text-muted-foreground">Mentor: {project.mentor}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Progress: Week {project.week}/{project.totalWeeks}
                              </p>
                              <Progress 
                                value={(project.week / project.totalWeeks) * 100} 
                                className="h-2 mt-1"
                              />
                            </div>
                          </div>
                          <div className="p-3 bg-red-50 rounded-md mb-3">
                            <p className="text-sm text-red-800">{project.issue}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Last updated: {project.lastUpdate}
                          </p>
                        </div>
                        <div className="ml-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline"
                                onClick={() => setSelectedProject(project)}
                              >
                                <AlertTriangle className="mr-2 h-4 w-4" />
                                Intervene
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Project Intervention</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">Project Details</h4>
                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                    <span className="text-muted-foreground">Project:</span>
                                    <span>{project.title}</span>
                                    <span className="text-muted-foreground">PM:</span>
                                    <span>{project.pmName}</span>
                                    <span className="text-muted-foreground">Issue:</span>
                                    <span>{project.issue}</span>
                                  </div>
                                </div>
                                
                                <div>
                                  <label className="text-sm font-medium">Intervention Note</label>
                                  <Textarea
                                    placeholder="Describe the intervention action or support provided..."
                                    value={interventionNote}
                                    onChange={(e) => setInterventionNote(e.target.value)}
                                    className="mt-1"
                                  />
                                </div>

                                <div className="flex space-x-2 pt-4">
                                  <Button 
                                    onClick={() => handleIntervention(project.id)}
                                    className="flex-1"
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Record Intervention
                                  </Button>
                                  <Button 
                                    variant="outline"
                                    onClick={() => setSelectedProject(null)}
                                    className="flex-1"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}