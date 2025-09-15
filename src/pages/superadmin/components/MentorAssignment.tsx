/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Calendar,
  Clock,
  Search,
  Star,
  User,
  UserPlus
} from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

const mentors = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    expertise: ["Product Strategy", "User Research", "Go-to-Market"],
    rating: 4.8,
    activeProjects: 3,
    maxProjects: 5,
    totalMentored: 24,
    availability: "available"
  },
  {
    id: 2,
    name: "Lisa Wong",
    email: "lisa.wong@email.com",
    expertise: ["UX Research", "Design Systems", "User Testing"],
    rating: 4.9,
    activeProjects: 2,
    maxProjects: 4,
    totalMentored: 18,
    availability: "available"
  },
  {
    id: 3,
    name: "David Brown",
    email: "david.b@email.com",
    expertise: ["Technical PM", "API Design", "System Architecture"],
    rating: 4.7,
    activeProjects: 5,
    maxProjects: 5,
    totalMentored: 31,
    availability: "busy"
  },
  {
    id: 4,
    name: "Maria Garcia",
    email: "maria.g@email.com",
    expertise: ["Data Analytics", "Growth Strategy", "A/B Testing"],
    rating: 4.8,
    activeProjects: 4,
    maxProjects: 6,
    totalMentored: 22,
    availability: "available"
  }
];

const unassignedProjects = [
  {
    id: 1,
    title: "Mobile Banking App",
    pmName: "Alex Rodriguez",
    industry: "FinTech",
    startDate: "2024-03-15",
    duration: "6 weeks",
    requiredExpertise: ["Product Strategy", "FinTech Experience"]
  },
  {
    id: 2,
    title: "Patient Portal Redesign",
    pmName: "Jennifer Kim",
    industry: "Healthcare",
    startDate: "2024-03-20",
    duration: "8 weeks",
    requiredExpertise: ["UX Research", "Healthcare Compliance"]
  },
  {
    id: 3,
    title: "Learning Management Platform",
    pmName: "Robert Wilson",
    industry: "EdTech",
    startDate: "2024-03-18",
    duration: "7 weeks",
    requiredExpertise: ["Technical PM", "EdTech Experience"]
  }
];

const assignments = [
  {
    id: 1,
    mentorName: "John Smith",
    projectTitle: "Mobile Payment App",
    pmName: "Sarah Chen",
    assignedDate: "2024-02-15",
    currentWeek: 3,
    totalWeeks: 6,
    status: "active"
  },
  {
    id: 2,
    mentorName: "Lisa Wong",
    projectTitle: "Healthcare Dashboard",
    pmName: "Mike Johnson",
    assignedDate: "2024-02-20",
    currentWeek: 2,
    totalWeeks: 8,
    status: "active"
  },
  {
    id: 3,
    mentorName: "Maria Garcia",
    projectTitle: "E-commerce Analytics",
    pmName: "Emily Davis",
    assignedDate: "2024-01-10",
    currentWeek: 8,
    totalWeeks: 8,
    status: "completed"
  }
];

export function MentorAssignment() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAssignment = () => {
    if (selectedProject && selectedMentor) {
      console.log(`Assigning ${selectedMentor.name} to ${selectedProject.title}`);
      setSelectedProject(null);
      setSelectedMentor(null);
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available": return "default";
      case "busy": return "secondary";
      case "unavailable": return "destructive";
      default: return "secondary";
    }
  };

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mentor Assignment</h1>
        <p className="text-muted-foreground">Assign mentors to projects and manage mentor workload</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Unassigned Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Unassigned Projects ({unassignedProjects.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {unassignedProjects.map((project) => (
                <div 
                  key={project.id} 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedProject?.id === project.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{project.title}</h4>
                    <Badge variant="outline">{project.industry}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">PM: {project.pmName}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      Starts {project.startDate}
                    </span>
                    <span className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {project.duration}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-1">Required Expertise:</p>
                    <div className="flex flex-wrap gap-1">
                      {project.requiredExpertise.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Mentors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Available Mentors
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search mentors by name or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMentors.map((mentor) => (
                <div 
                  key={mentor.id} 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedMentor?.id === mentor.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedMentor(mentor)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{mentor.name}</h4>
                    <Badge variant={getAvailabilityColor(mentor.availability)}>
                      {mentor.availability}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="flex items-center">
                      <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {mentor.rating}
                    </span>
                    <span>{mentor.activeProjects}/{mentor.maxProjects} projects</span>
                  </div>
                  <div className="mb-2">
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {mentor.totalMentored} projects mentored
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Action */}
      {selectedProject && selectedMentor && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Ready to Assign</h3>
                <p className="text-sm text-muted-foreground">
                  Assign <strong>{selectedMentor.name}</strong> to <strong>{selectedProject.title}</strong>
                </p>
              </div>
              <Button onClick={handleAssignment}>
                <UserPlus className="mr-2 h-4 w-4" />
                Assign Mentor
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Assignments */}
      <Card>
        <CardHeader>
          <CardTitle>Current Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mentor</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>PM</TableHead>
                <TableHead>Assigned Date</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium">{assignment.mentorName}</TableCell>
                  <TableCell>{assignment.projectTitle}</TableCell>
                  <TableCell>{assignment.pmName}</TableCell>
                  <TableCell>{assignment.assignedDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-[60px] bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(assignment.currentWeek / assignment.totalWeeks) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {assignment.currentWeek}/{assignment.totalWeeks}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={assignment.status === "active" ? "default" : "secondary"}>
                      {assignment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {assignment.status === "active" && (
                      <Button variant="outline" size="sm">
                        Reassign
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}