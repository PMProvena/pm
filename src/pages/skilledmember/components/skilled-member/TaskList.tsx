import { CheckCircle, Clock, Upload, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Separator } from "../ui/separator"

interface Task {
  id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed' | 'needs-revision'
  dueDate: string
  projectName: string
  milestoneNumber: number
  hasDeliverable: boolean
  points: number
}

interface TaskListProps {
  tasks: Task[]
  onTaskComplete: (taskId: string) => void
  onUploadDeliverable: (taskId: string) => void
}

export function TaskList({ tasks, onTaskComplete, onUploadDeliverable }: TaskListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-gray-100 text-gray-800'
      case 'needs-revision': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'in-progress': return <Clock className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'needs-revision': return <FileText className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const upcomingTasks = tasks.filter(task => task.status !== 'completed')
  const completedTasks = tasks.filter(task => task.status === 'completed')

  return (
    <div className="space-y-6">
      {upcomingTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Tasks ({upcomingTasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={task.id}>
                <div className="flex items-start gap-4">
                  <Checkbox 
                    checked={task.status === 'completed'}
                    onCheckedChange={() => onTaskComplete(task.id)}
                    disabled={task.status === 'completed'}
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{task.projectName}</span>
                          <span>•</span>
                          <span>Milestone {task.milestoneNumber}</span>
                          <span>•</span>
                          <span>Due {task.dueDate}</span>
                          <span>•</span>
                          <span>{task.points} points</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(task.status)}>
                          {getStatusIcon(task.status)}
                          <span className="ml-1 capitalize">{task.status.replace('-', ' ')}</span>
                        </Badge>
                      </div>
                    </div>
                    
                    {task.hasDeliverable && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onUploadDeliverable(task.id)}
                        >
                          <Upload className="h-3 w-3 mr-1" />
                          Upload Deliverable
                        </Button>
                        {task.status === 'completed' && (
                          <Badge variant="secondary">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Submitted
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {index < upcomingTasks.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {completedTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Completed Tasks ({completedTasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {completedTasks.map((task, index) => (
              <div key={task.id}>
                <div className="flex items-start gap-4 opacity-75">
                  <Checkbox checked={true} disabled />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium line-through">{task.title}</h4>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{task.projectName}</span>
                          <span>•</span>
                          <span>Milestone {task.milestoneNumber}</span>
                          <span>•</span>
                          <span>Completed</span>
                          <span>•</span>
                          <Badge variant="secondary" className="text-xs">
                            +{task.points} points earned
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {index < completedTasks.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}