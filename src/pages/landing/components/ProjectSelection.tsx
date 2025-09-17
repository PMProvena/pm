import { Clock, CreditCard, DollarSign, GraduationCap, Heart, ShoppingCart, Smartphone, Target, Users } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

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

interface ProjectSelectionProps {
  onProjectSelect: (project: Project) => void;
  onBack: () => void;
}

export function ProjectSelection({ onProjectSelect, onBack }: ProjectSelectionProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'ecommerce-mobile',
      title: 'Mobile Commerce App Redesign',
      industry: 'E-commerce',
      description: 'Lead the redesign of a mobile commerce app to improve conversion rates and user experience.',
      duration: '6 weeks',
      price: 299,
      difficulty: 'Intermediate',
      skills: ['UI/UX Designer', 'Mobile Developer', 'Backend Developer'],
      milestones: 6,
      teamSize: 4,
      icon: <ShoppingCart className="h-6 w-6" />,
      objectives: [
        'Conduct user research and competitive analysis',
        'Design improved user flows and wireframes',
        'Implement A/B testing for key features',
        'Optimize checkout process for mobile',
        'Integrate analytics and tracking'
      ]
    },
    {
      id: 'fintech-dashboard',
      title: 'Personal Finance Dashboard',
      industry: 'FinTech',
      description: 'Build a comprehensive personal finance management platform with budgeting and investment tracking.',
      duration: '8 weeks',
      price: 399,
      difficulty: 'Advanced',
      skills: ['UI/UX Designer', 'Frontend Developer', 'Backend Developer'],
      milestones: 8,
      teamSize: 4,
      icon: <CreditCard className="h-6 w-6" />,
      objectives: [
        'Design secure authentication system',
        'Build budget tracking and categorization',
        'Implement investment portfolio tracking',
        'Create financial insights and reporting',
        'Ensure regulatory compliance'
      ]
    },
    {
      id: 'healthtech-app',
      title: 'Telemedicine Platform',
      industry: 'HealthTech',
      description: 'Develop a telemedicine platform connecting patients with healthcare providers.',
      duration: '8 weeks',
      price: 449,
      difficulty: 'Advanced',
      skills: ['UI/UX Designer', 'Frontend Developer', 'Backend Developer', 'Mobile Developer'],
      milestones: 8,
      teamSize: 5,
      icon: <Heart className="h-6 w-6" />,
      objectives: [
        'Design HIPAA-compliant user flows',
        'Build video consultation features',
        'Implement appointment scheduling',
        'Create patient records management',
        'Integrate payment processing'
      ]
    },
    {
      id: 'edtech-platform',
      title: 'Online Learning Platform',
      industry: 'EdTech',
      description: 'Create an interactive online learning platform with progress tracking and assessments.',
      duration: '6 weeks',
      price: 349,
      difficulty: 'Intermediate',
      skills: ['UI/UX Designer', 'Frontend Developer', 'Backend Developer'],
      milestones: 6,
      teamSize: 4,
      icon: <GraduationCap className="h-6 w-6" />,
      objectives: [
        'Design engaging course interfaces',
        'Build progress tracking system',
        'Implement interactive assessments',
        'Create instructor dashboard',
        'Add social learning features'
      ]
    },
    {
      id: 'saas-analytics',
      title: 'SaaS Analytics Dashboard',
      industry: 'SaaS',
      description: 'Build a comprehensive analytics dashboard for SaaS businesses to track key metrics.',
      duration: '4 weeks',
      price: 249,
      difficulty: 'Beginner',
      skills: ['UI/UX Designer', 'Frontend Developer'],
      milestones: 4,
      teamSize: 3,
      icon: <Target className="h-6 w-6" />,
      objectives: [
        'Design intuitive data visualization',
        'Build customizable dashboard widgets',
        'Implement real-time data updates',
        'Create automated reporting',
        'Add team collaboration features'
      ]
    },
    {
      id: 'mobile-fitness',
      title: 'Fitness Tracking Mobile App',
      industry: 'Mobile Apps',
      description: 'Develop a comprehensive fitness tracking app with social features and coaching.',
      duration: '6 weeks',
      price: 329,
      difficulty: 'Intermediate',
      skills: ['UI/UX Designer', 'Mobile Developer', 'Backend Developer'],
      milestones: 6,
      teamSize: 4,
      icon: <Smartphone className="h-6 w-6" />,
      objectives: [
        'Design motivating workout interfaces',
        'Build social sharing features',
        'Implement progress tracking',
        'Create personalized coaching',
        'Integrate wearable devices'
      ]
    }
  ];

  const industries = ['all', 'E-commerce', 'FinTech', 'HealthTech', 'EdTech', 'SaaS', 'Mobile Apps'];
  
  const filteredProjects = selectedIndustry === 'all' 
    ? projects 
    : projects.filter(project => project.industry === selectedIndustry);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedProject) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={() => setSelectedProject(null)} className="mb-6">
            ← Back to Projects
          </Button>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {selectedProject.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{selectedProject.title}</CardTitle>
                      <CardDescription className="text-lg">{selectedProject.industry}</CardDescription>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{selectedProject.description}</p>
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
                    <h3 className="text-lg mb-3">Required Team Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg mb-3">Project Timeline</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm">0/{selectedProject.milestones} milestones</span>
                      </div>
                      <Progress value={0} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        {selectedProject.duration} • {selectedProject.milestones} weekly milestones
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{selectedProject.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Team Size</span>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{selectedProject.teamSize} members</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Difficulty</span>
                    <Badge className={getDifficultyColor(selectedProject.difficulty)}>
                      {selectedProject.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Milestones</span>
                    <span className="text-sm">{selectedProject.milestones}</span>
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
                      <span className="text-3xl">${selectedProject.price}</span>
                      <span className="text-muted-foreground">/ project</span>
                    </div>
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => onProjectSelect(selectedProject)}
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Start This Project
                    </Button>
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
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ← Back to Dashboard
          </Button>
          <h1 className="text-3xl mb-2">Choose Your Project</h1>
          <p className="text-muted-foreground">
            Select an industry-specific project to start building real-world Provena
          </p>
        </div>

        {/* Industry Filter */}
        <div className="mb-8">
          <h3 className="text-lg mb-4">Filter by Industry</h3>
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <Button
                key={industry}
                variant={selectedIndustry === industry ? "default" : "outline"}
                onClick={() => setSelectedIndustry(industry)}
                className="capitalize"
              >
                {industry === 'all' ? 'All Industries' : industry}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {project.icon}
                  </div>
                  <Badge variant="secondary">{project.industry}</Badge>
                </div>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription className="text-sm line-clamp-2">
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
                  <span className="text-lg">${project.price}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {project.skills.slice(0, 2).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {project.skills.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.skills.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => setSelectedProject(project)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found for the selected industry.</p>
          </div>
        )}
      </div>
    </div>
  );
}