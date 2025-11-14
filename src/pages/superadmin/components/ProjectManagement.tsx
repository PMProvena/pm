import {
  Calendar,
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Progress } from "./ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useNavigate } from "react-router-dom";
import { useGetProjects } from "@/hooks/projects/useGetProjects";
import type { Project } from "@/api/interfaces/projects";
import Error from "@/pages/landing/components/error/Error";
import Loader from "@/components/Loader";

export function ProjectManagement() {
  const navigate = useNavigate();

  const {
    data: allProjects,
    isPending,
    isError,
    refetch: refetchProjects,
  } = useGetProjects() as {
    data?: { success: boolean; message: string; data: Project[] };
    isPending: boolean;
    isError: boolean;
    refetch: () => void;
  };

  console.log("allProjects", allProjects);

  const projects = allProjects?.data ?? [];
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const selectedProject = projects.find((p) => p._id === selectedProjectId);

  const getDifficultyBadgeClass = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500 text-white hover:bg-green-600";
      case "Intermediate":
        return "bg-yellow-500 text-white hover:bg-yellow-600";
      case "Advanced":
        return "bg-red-500 text-white hover:bg-red-600";
      default:
        return "bg-gray-400 text-white";
    }
  };

  if (isError) return <Error refetchData={refetchProjects} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Project Management</h1>
          <p className="text-muted-foreground">
            Manage industries, project briefs, and milestones
          </p>
        </div>
        <Button
          className="cursor-pointer"
          onClick={() => navigate("/admin/projects/new")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Project
        </Button>
      </div>

      <Tabs defaultValue="industries" className="space-y-4">
        <TabsList>
          <TabsTrigger value="industries" className="cursor-pointer">
            Industries
          </TabsTrigger>
          <TabsTrigger value="briefs" className="cursor-pointer">
            Project Briefs
          </TabsTrigger>
          <TabsTrigger value="milestones" className="cursor-pointer">
            Milestones
          </TabsTrigger>
        </TabsList>

        {/* Industries Tab */}
        <TabsContent value="industries">
          <Card>
            <CardHeader>
              <CardTitle>Industry Categories</CardTitle>
            </CardHeader>
            <CardContent>
              {isPending ? (
                 <Loader /> 
              ) : projects.length ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(
                    projects.reduce(
                      (
                        acc: Record<string, { total: number; active: number }>,
                        project
                      ) => {
                        const industry = project.industry || "—";
                        if (!acc[industry])
                          acc[industry] = { total: 0, active: 0 };
                        acc[industry].total += 1;
                        if (project.status === "in-progress")
                          acc[industry].active += 1;
                        return acc;
                      },
                      {}
                    )
                  ).map(([industry, stats], i) => (
                    <Card key={i} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{industry}</h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 cursor-pointer"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive cursor-pointer">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        {industry === "—"
                          ? "No industry information available"
                          : `Projects in the ${industry} industry`}
                      </p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Active Projects</span>
                          <span className="font-medium">{stats.active}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total Projects</span>
                          <span className="font-medium">{stats.total}</span>
                        </div>

                        <Progress
                          value={(stats.active / stats.total) * 100}
                          className="h-2"
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No projects available.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Project Briefs */}
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
                    <TableHead>Team Size</TableHead>
                    <TableHead>Milestones</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => {
                    const totalMilestones = project.milestones?.length ?? 0;
                    const completedMilestones =
                      project.milestones?.filter(
                        (m) => m.status === "completed"
                      ).length ?? 0;

                    const completionRate =
                      totalMilestones > 0
                        ? Math.round(
                            (completedMilestones / totalMilestones) * 100
                          )
                        : 0;

                    return (
                      <TableRow key={project._id}>
                        <TableCell className="font-medium capitalize">
                          {project.title}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{project.industry}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {project.duration}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getDifficultyBadgeClass(
                              project.difficulty
                            )}
                          >
                            {project.difficulty}
                          </Badge>
                        </TableCell>
                        <TableCell>{project.teamSize}</TableCell>
                        <TableCell className="mt-2 flex items-center gap-2">
                          <Progress
                            value={completionRate}
                            className="h-2 w-full"
                          />
                          <span className="text-xs text-muted-foreground">
                            {completionRate}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 cursor-pointer"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  setSelectedProjectId(project._id)
                                }
                                className="cursor-pointer"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Milestones
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive cursor-pointer">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Milestones */}
        <TabsContent value="milestones">
          <Card>
            <CardHeader>
              <CardTitle>Project Milestones</CardTitle>
              {selectedProject && (
                <p className="text-sm text-muted-foreground capitalize">
                  Showing milestones for: {selectedProject.title}
                </p>
              )}
            </CardHeader>
            <CardContent>
              {selectedProject ? (
                selectedProject.milestones?.length ? (
                  <div className="space-y-4">
                    {selectedProject.milestones?.map((milestone, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold capitalize">
                              Week {milestone.week}: {milestone.title}
                            </h4>
                            <Badge className="mt-1 capitalize">
                              {milestone.status}
                            </Badge>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 cursor-pointer"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="cursor-pointer">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive cursor-pointer">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Expected Deliverables:
                          </p>
                          <ul className="text-sm space-y-1">
                            {(milestone.deliverables ?? []).map(
                              (deliverable: string, index: number) => (
                                <li key={index} className="flex items-center">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                                  {deliverable}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>No milestones found for this project.</p>
                  </div>
                )
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>
                    Select a project from the Project Briefs tab to view its
                    milestones
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
