import { Calendar, Users, Target, AlertCircle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    industry: string
    status: 'active' | 'completed' | 'paused'
    progress: number
    currentMilestone: string
    totalMilestones: number
    completedMilestones: number
    endDate: string
    teamMembers: Array<{
      name: string
      role: string
      avatar?: string
    }>
    pmName: string
    pendingTasks: number
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Target className="h-3 w-3" />
      case 'completed': return <CheckCircle className="h-3 w-3" />
      case 'paused': return <AlertCircle className="h-3 w-3" />
      default: return null
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{project.industry}</p>
          </div>
          <Badge className={getStatusColor(project.status)}>
            {getStatusIcon(project.status)}
            <span className="ml-1 capitalize">{project.status}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span>{project.completedMilestones}/{project.totalMilestones} Milestones</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Due {project.endDate}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Current Milestone</p>
          <p className="text-sm text-muted-foreground">{project.currentMilestone}</p>
        </div>
        
        {project.pendingTasks > 0 && (
          <div className="flex items-center gap-2 rounded-md bg-yellow-50 p-2">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-yellow-800">
              {project.pendingTasks} pending task{project.pendingTasks !== 1 ? 's' : ''}
            </span>
          </div>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Team</span>
          </div>
          <div className="flex -space-x-2">
            {project.teamMembers.slice(0, 4).map((member, index) => (
              <Avatar key={index} className="h-8 w-8 border-2 border-white">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-xs">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.teamMembers.length > 4 && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-muted text-xs">
                +{project.teamMembers.length - 4}
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">PM: {project.pmName}</p>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full" variant="outline">
          View Project
        </Button>
      </CardFooter>
    </Card>
  )
}