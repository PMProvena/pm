import type { Project, ProjectSelectionProps } from "@/api/interfaces/projects";
import { PayButton } from "@/components/PayButton";
import { useGetProjects } from "@/hooks/projects/useGetProjects";
import {
  Clock,
  CreditCard,
  // DollarSign,
  GraduationCap,
  Heart,
  ShoppingCart,
  Smartphone,
  Target,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import Error from "./error/Error";
import ProjectsSkeletonLoader from "./loader/ProjectsSkeletonLoader";

export function ProjectSelection({ user }: ProjectSelectionProps) {
  console.log("user", user);
  const nav = useNavigate();

  const {
    data: allProjects,
    isPending,
    isError,
    refetch: refetchProjects,
  } = useGetProjects() as {
    data?: { projects: Project[] };
    isPending: boolean;
    isError: boolean;
    refetch: () => void;
  };

  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { projects } = useMemo(() => {
    return { projects: allProjects?.projects || [] };
  }, [allProjects]);

  // map icons dynamically by industry
  const getIcon = (industry: string) => {
    switch (industry.toLowerCase()) {
      case "e-commerce":
        return <ShoppingCart className="h-6 w-6" />;
      case "fintech":
        return <CreditCard className="h-6 w-6" />;
      case "healthtech":
        return <Heart className="h-6 w-6" />;
      case "edtech":
        return <GraduationCap className="h-6 w-6" />;
      case "saas":
        return <Target className="h-6 w-6" />;
      case "mobile apps":
        return <Smartphone className="h-6 w-6" />;
      default:
        return <Users className="h-6 w-6" />;
    }
  };

  const industries = useMemo(() => {
    const uniqueIndustries = Array.from(
      new Set(projects.map((p) => p.industry))
    );
    return ["all", ...uniqueIndustries];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedIndustry === "all") return projects;
    return projects.filter((project) => project.industry === selectedIndustry);
  }, [projects, selectedIndustry]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const onBack = () => {
    nav("/dashboard");
  };

  if (isError) return <Error refetchData={refetchProjects} />;

  if (selectedProject) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setSelectedProject(null)}
            className="mb-6 cursor-pointer"
          >
            ← Back to Projects
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Project Info */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {getIcon(selectedProject.industry)}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">
                        {selectedProject.title}
                      </CardTitle>
                      <CardDescription className="text-lg">
                        {selectedProject.industry}
                      </CardDescription>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    {selectedProject.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg mb-3">Project Objectives</h3>
                    <ul className="space-y-2">
                      {selectedProject.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.requiredSkills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg mb-3">Project Timeline</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm">
                          0/{selectedProject.milestones} milestones
                        </span>
                      </div>
                      <Progress value={0} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        {selectedProject.duration} •{" "}
                        {selectedProject.milestones} weekly milestones
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Duration
                    </span>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">
                        {selectedProject.duration}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Team Size
                    </span>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">
                        {selectedProject.teamSize} members
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Difficulty
                    </span>
                    <Badge
                      className={getDifficultyColor(selectedProject.difficulty)}
                    >
                      {selectedProject.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Milestones
                    </span>
                    <span className="text-sm">
                      {selectedProject.milestones}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div>
                      <span className="text-3xl">₦{selectedProject.price}</span>
                      <span className="text-muted-foreground">/ project</span>
                    </div>
                    {/* <Button className="w-full cursor-pointer" size="lg">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Start This Project
                    </Button> */}
                    {user && selectedProject && (
                      <PayButton
                        email={user.email}
                        amount={selectedProject.price}
                        projectId={selectedProject._id}
                        userId={user._id}
                      >
                        {/* <DollarSign className="h-4 w-4 mr-2" /> */}
                        {/* ₦  */}
                        Start This Project
                      </PayButton>
                    )}

                    <p className="text-xs text-muted-foreground">
                      Includes mentorship, team access, and certification
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 cursor-pointer"
          >
            ← Back to Dashboard
          </Button>
          <h1 className="text-3xl mb-2">Choose Your Project</h1>
          <p className="text-muted-foreground">
            Select an industry-specific project to start building real-world PM
            experience
          </p>
        </div>

        {isPending ? (
          <ProjectsSkeletonLoader />
        ) : (
          <>
            {/* Industry Filter */}
            <div className="mb-8">
              <h3 className="text-lg mb-4">Filter by Industry</h3>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <Button
                    key={industry}
                    variant={
                      selectedIndustry === industry ? "default" : "outline"
                    }
                    onClick={() => setSelectedIndustry(industry)}
                    className="capitalize cursor-pointer"
                  >
                    {industry === "all" ? "All Industries" : industry}
                  </Button>
                ))}
              </div>
            </div>

            {/* Projects grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card
                  key={project._id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedProject(project)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {getIcon(project.industry)}
                      </div>
                      <Badge variant="secondary">{project.industry}</Badge>
                    </div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-1">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{project.teamSize}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge className={getDifficultyColor(project.difficulty)}>
                        {project.difficulty}
                      </Badge>
                      <span className="text-lg">₦{project.price}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {project.requiredSkills
                        ?.slice(0, 2)
                        .map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      {project.requiredSkills?.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.requiredSkills.length - 2} more
                        </Badge>
                      )}
                    </div>

                    <Button
                      className="w-full cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      {" "}
                      View Details{" "}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {!filteredProjects.length && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found for the selected industry.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
