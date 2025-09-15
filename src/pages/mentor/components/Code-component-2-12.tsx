import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  ExternalLink,
  FileText,
  MessageSquare,
  Star,
  Users
} from 'lucide-react';
import { useState } from 'react';
import { DeliverableReview } from './DeliverableReview';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';

interface Project {
  id: string;
  title: string;
  industry: string;
  pm: {
    name: string;
    avatar: string;
  };
  teamSize: number;
  duration: string;
  progress: number;
  status: 'active' | 'completed' | 'pending_review';
  currentMilestone: string;
  nextDeadline: string;
  totalMilestones: number;
  completedMilestones: number;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'completed' | 'in_progress' | 'pending' | 'overdue';
  deliverables: Deliverable[];
  pointsEarned?: number;
}

interface Deliverable {
  id: string;
  title: string;
  type: 'document' | 'presentation' | 'prototype' | 'research';
  uploadedAt: string;
  fileUrl?: string;
  description: string;
  feedback?: {
    rating: number;
    comments: string;
    providedAt: string;
  };
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  skills: string[];
}

const mockMilestones: Milestone[] = [
  {
    id: '1',
    title: 'Market Research & User Analysis',
    description: 'Conduct comprehensive market research and define target user personas',
    dueDate: '2025-09-05',
    status: 'completed',
    pointsEarned: 100,
    deliverables: [
      {
        id: '1',
        title: 'Market Research Report',
        type: 'document',
        uploadedAt: '2025-09-04',
        fileUrl: '#',
        description: 'Comprehensive analysis of e-commerce mobile app market trends and competitor analysis',
        feedback: {
          rating: 4,
          comments: 'Excellent research depth. Consider adding more specific data on mobile usage patterns in target demographics.',
          providedAt: '2025-09-05'
        }
      },
      {
        id: '2',
        title: 'User Personas & Journey Maps',
        type: 'document',
        uploadedAt: '2025-09-04',
        fileUrl: '#',
        description: 'Detailed user personas and customer journey maps for the e-commerce app',
        feedback: {
          rating: 5,
          comments: 'Outstanding work! The personas are well-researched and the journey maps clearly identify pain points.',
          providedAt: '2025-09-05'
        }
      }
    ]
  },
  {
    id: '2',
    title: 'Product Requirements & Specifications',
    description: 'Define detailed product requirements and technical specifications',
    dueDate: '2025-09-08',
    status: 'completed',
    pointsEarned: 100,
    deliverables: [
      {
        id: '3',
        title: 'PRD Document',
        type: 'document',
        uploadedAt: '2025-09-07',
        fileUrl: '#',
        description: 'Product Requirements Document with detailed feature specifications',
        feedback: {
          rating: 4,
          comments: 'Good structure and detail. Add more specific acceptance criteria for key features.',
          providedAt: '2025-09-08'
        }
      }
    ]
  },
  {
    id: '3',
    title: 'Design & Prototyping',
    description: 'Create wireframes, mockups, and interactive prototypes',
    dueDate: '2025-09-12',
    status: 'completed',
    pointsEarned: 120,
    deliverables: [
      {
        id: '4',
        title: 'Wireframes & Mockups',
        type: 'prototype',
        uploadedAt: '2025-09-11',
        fileUrl: '#',
        description: 'High-fidelity wireframes and visual mockups for all key screens',
        feedback: {
          rating: 5,
          comments: 'Excellent design work! The user flow is intuitive and the visual hierarchy is clear.',
          providedAt: '2025-09-12'
        }
      }
    ]
  },
  {
    id: '4',
    title: 'User Testing & Iteration',
    description: 'Conduct user testing and iterate based on feedback',
    dueDate: '2025-09-19',
    status: 'in_progress',
    deliverables: [
      {
        id: '5',
        title: 'User Testing Report',
        type: 'research',
        uploadedAt: '2025-09-14',
        fileUrl: '#',
        description: 'Results from usability testing sessions with target users'
      },
      {
        id: '6',
        title: 'Iteration Plan',
        type: 'document',
        uploadedAt: '2025-09-14',
        fileUrl: '#',
        description: 'Plan for implementing changes based on user feedback'
      }
    ]
  }
];

const mockTeam: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    skills: ['UI Design', 'UX Research', 'Prototyping']
  },
  {
    id: '2',
    name: 'David Kumar',
    role: 'Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    skills: ['React', 'TypeScript', 'Mobile Development']
  },
  {
    id: '3',
    name: 'Maria Santos',
    role: 'Backend Developer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    skills: ['Node.js', 'Database Design', 'API Development']
  },
  {
    id: '4',
    name: 'James Wilson',
    role: 'Mobile Developer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    skills: ['React Native', 'iOS', 'Android']
  }
];

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const [selectedDeliverable, setSelectedDeliverable] = useState<Deliverable | null>(null);
  const [activeTab, setActiveTab] = useState('milestones');
  const [leaveReason, setLeaveReason] = useState('');
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);

  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'pending': return 'bg-gray-500';
      case 'overdue': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'overdue': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getFileTypeIcon = (type: Deliverable['type']) => {
    switch (type) {
      case 'document': return <FileText className="h-4 w-4" />;
      case 'presentation': return <FileText className="h-4 w-4" />;
      case 'prototype': return <ExternalLink className="h-4 w-4" />;
      case 'research': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  if (selectedDeliverable) {
    return (
      <DeliverableReview 
        deliverable={selectedDeliverable}
        onBack={() => setSelectedDeliverable(null)}
        onFeedbackSubmit={(feedback) => {
          // Handle feedback submission
          console.log('Feedback submitted:', feedback);
          setSelectedDeliverable(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{project.title}</h1>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant="outline">{project.industry}</Badge>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{project.duration}</span>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{project.teamSize} members</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setShowLeaveDialog(true)}>
              Leave Project
            </Button>
          </div>
        </div>

        {/* Project Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={project.pm.avatar} />
                  <AvatarFallback>{project.pm.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{project.pm.name}</CardTitle>
                  <CardDescription>Product Manager</CardDescription>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-lg font-bold">{project.completedMilestones}/{project.totalMilestones} Milestones</p>
                <Progress value={project.progress} className="w-32 mt-2" />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="feedback">Feedback History</TabsTrigger>
          </TabsList>

          <TabsContent value="milestones" className="space-y-6">
            <div className="space-y-4">
              {mockMilestones.map((milestone, index) => (
                <Card key={milestone.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                          {index + 1}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{milestone.title}</CardTitle>
                          <CardDescription>{milestone.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(milestone.status)} text-white border-0`}
                        >
                          {getStatusIcon(milestone.status)}
                          <span className="ml-1 capitalize">{milestone.status.replace('_', ' ')}</span>
                        </Badge>
                        {milestone.pointsEarned && (
                          <Badge variant="outline">
                            <Star className="h-3 w-3 mr-1" />
                            {milestone.pointsEarned} pts
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Due: {milestone.dueDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {milestone.deliverables.length} deliverable(s)
                        </span>
                      </div>
                    </div>

                    {milestone.deliverables.length > 0 && (
                      <div className="space-y-3">
                        <Separator />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {milestone.deliverables.map((deliverable) => (
                            <div 
                              key={deliverable.id}
                              className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                              onClick={() => setSelectedDeliverable(deliverable)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3">
                                  {getFileTypeIcon(deliverable.type)}
                                  <div className="flex-1">
                                    <p className="font-medium text-sm">{deliverable.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {deliverable.description}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                      Uploaded: {deliverable.uploadedAt}
                                    </p>
                                    {deliverable.feedback && (
                                      <div className="flex items-center space-x-2 mt-2">
                                        <div className="flex">
                                          {[...Array(5)].map((_, i) => (
                                            <Star 
                                              key={i} 
                                              className={`h-3 w-3 ${
                                                i < deliverable.feedback!.rating 
                                                  ? 'text-yellow-400 fill-current' 
                                                  : 'text-gray-300'
                                              }`} 
                                            />
                                          ))}
                                        </div>
                                        <span className="text-xs text-muted-foreground">Reviewed</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  {deliverable.fileUrl && (
                                    <Button variant="ghost" size="sm">
                                      <Download className="h-3 w-3" />
                                    </Button>
                                  )}
                                  <Button variant="ghost" size="sm">
                                    <MessageSquare className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* PM Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={project.pm.avatar} />
                      <AvatarFallback>{project.pm.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{project.pm.name}</CardTitle>
                      <CardDescription>Product Manager</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="bg-blue-500 text-white border-0">Project Lead</Badge>
                </CardContent>
              </Card>

              {/* Team Members */}
              {mockTeam.map((member) => (
                <Card key={member.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill) => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feedback History</CardTitle>
                <CardDescription>
                  All feedback provided for this project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockMilestones.flatMap(m => 
                  m.deliverables
                    .filter(d => d.feedback)
                    .map(d => (
                      <div key={d.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{d.title}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${
                                      i < d.feedback!.rating 
                                        ? 'text-yellow-400 fill-current' 
                                        : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {d.feedback!.providedAt}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              {d.feedback!.comments}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Leave Project Dialog */}
        {showLeaveDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Leave Project</CardTitle>
                <CardDescription>
                  Are you sure you want to leave this project? Please provide a reason.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Reason for leaving</Label>
                  <Select onValueChange={setLeaveReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduling">Scheduling conflicts</SelectItem>
                      <SelectItem value="workload">Too much workload</SelectItem>
                      <SelectItem value="personal">Personal reasons</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Additional comments (optional)</Label>
                  <Textarea placeholder="Provide any additional context..." />
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowLeaveDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={() => {
                      // Handle leave project
                      console.log('Leaving project with reason:', leaveReason);
                      setShowLeaveDialog(false);
                      onBack();
                    }}
                  >
                    Leave Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}