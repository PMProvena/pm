import { Calendar, Edit, Eye, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { Progress } from "./ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const industries = [
  { id: 1, name: "FinTech", activeProjects: 23, totalProjects: 68, description: "Financial technology solutions" },
  { id: 2, name: "Healthcare", activeProjects: 18, totalProjects: 50, description: "Healthcare and medical technology" },
  { id: 3, name: "E-commerce", activeProjects: 15, totalProjects: 43, description: "Online retail and marketplace solutions" },
  { id: 4, name: "EdTech", activeProjects: 12, totalProjects: 31, description: "Educational technology platforms" },
  { id: 5, name: "SaaS", activeProjects: 21, totalProjects: 59, description: "Software as a Service solutions" }
];

const projectBriefs = [
  { 
    id: 1, 
    title: "Mobile Payment App", 
    industry: "FinTech", 
    duration: "6 weeks", 
    difficulty: "Intermediate",
    teamsWorking: 5,
    completionRate: 78
  },
  { 
    id: 2, 
    title: "Telemedicine Platform", 
    industry: "Healthcare", 
    duration: "8 weeks", 
    difficulty: "Advanced",
    teamsWorking: 3,
    completionRate: 85
  },
  { 
    id: 3, 
    title: "Inventory Management System", 
    industry: "E-commerce", 
    duration: "4 weeks", 
    difficulty: "Beginner",
    teamsWorking: 7,
    completionRate: 92
  },
  { 
    id: 4, 
    title: "Student Analytics Dashboard", 
    industry: "EdTech", 
    duration: "6 weeks", 
    difficulty: "Intermediate",
    teamsWorking: 4,
    completionRate: 67
  }
];

const milestones = [
  { 
    id: 1, 
    projectId: 1, 
    week: 1, 
    title: "Market Research & Problem Definition", 
    deliverables: ["User Research Report", "Problem Statement", "Competitive Analysis"],
    status: "active"
  },
  { 
    id: 2, 
    projectId: 1, 
    week: 2, 
    title: "Solution Ideation & Validation", 
    deliverables: ["Solution Concepts", "User Feedback", "Technical Feasibility"],
    status: "active"
  },
  { 
    id: 3, 
    projectId: 1, 
    week: 3, 
    title: "MVP Definition & Design", 
    deliverables: ["MVP Specification", "User Journey", "Wireframes"],
    status: "active"
  },
  { 
    id: 4, 
    projectId: 1, 
    week: 4, 
    title: "Development Planning", 
    deliverables: ["Technical Architecture", "Development Timeline", "Resource Plan"],
    status: "active"
  }
];

export function ProjectManagement() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Project Management</h1>
          <p className="text-muted-foreground">Manage industries, project briefs, and milestones</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <Tabs defaultValue="industries" className="space-y-4">
        <TabsList>
          <TabsTrigger value="industries">Industries</TabsTrigger>
          <TabsTrigger value="briefs">Project Briefs</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="industries">
          <Card>
            <CardHeader>
              <CardTitle>Industry Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {industries.map((industry) => (
                  <Card key={industry.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{industry.name}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{industry.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Active Projects</span>
                        <span className="font-medium">{industry.activeProjects}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Projects</span>
                        <span className="font-medium">{industry.totalProjects}</span>
                      </div>
                      <Progress 
                        value={(industry.activeProjects / industry.totalProjects) * 100} 
                        className="h-2"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="briefs">
          <Card>
            <CardHeader>
              <CardTitle>Project Briefs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Title</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Active Teams</TableHead>
                    <TableHead>Completion Rate</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectBriefs.map((brief) => (
                    <TableRow key={brief.id}>
                      <TableCell className="font-medium">{brief.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{brief.industry}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {brief.duration}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            brief.difficulty === "Beginner" ? "default" : 
                            brief.difficulty === "Intermediate" ? "secondary" : 
                            "destructive"
                          }
                        >
                          {brief.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>{brief.teamsWorking}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={brief.completionRate} className="w-[60px] h-2" />
                          <span className="text-sm text-muted-foreground">{brief.completionRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedProject(brief.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Milestones
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones">
          <Card>
            <CardHeader>
              <CardTitle>Project Milestones</CardTitle>
              {selectedProject && (
                <p className="text-sm text-muted-foreground">
                  Showing milestones for: {projectBriefs.find(p => p.id === selectedProject)?.title}
                </p>
              )}
            </CardHeader>
            <CardContent>
              {selectedProject ? (
                <div className="space-y-4">
                  {milestones
                    .filter(m => m.projectId === selectedProject)
                    .map((milestone) => (
                    <Card key={milestone.id} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">Week {milestone.week}: {milestone.title}</h4>
                          <Badge className="mt-1">{milestone.status}</Badge>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Expected Deliverables:</p>
                        <ul className="text-sm space-y-1">
                          {milestone.deliverables.map((deliverable, index) => (
                            <li key={index} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Select a project from the Project Briefs tab to view its milestones</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}