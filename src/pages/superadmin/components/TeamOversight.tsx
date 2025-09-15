/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  MessageSquare,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";

const removalRequests = [
  {
    id: 1,
    pmName: "Sarah Chen",
    projectTitle: "Mobile Payment App",
    memberName: "Tom Wilson",
    memberRole: "UI/UX Designer",
    reason:
      "Not meeting project deadlines and deliverable quality is below expectations. Team dynamics are also affected.",
    requestDate: "2024-03-10",
    status: "pending",
    priority: "high",
  },
  {
    id: 2,
    pmName: "Mike Johnson",
    projectTitle: "Healthcare Dashboard",
    memberName: "Chris Lee",
    memberRole: "Backend Developer",
    reason:
      "Communication issues and different timezone creating coordination problems.",
    requestDate: "2024-03-09",
    status: "pending",
    priority: "medium",
  },
  {
    id: 3,
    pmName: "Emily Davis",
    projectTitle: "E-commerce Analytics",
    memberName: "Amy Foster",
    memberRole: "Data Scientist",
    reason:
      "Skill mismatch - requires more advanced ML expertise than initially assessed.",
    requestDate: "2024-03-08",
    status: "approved",
    priority: "medium",
  },
];

const activeTeams = [
  {
    id: 1,
    pmName: "Sarah Chen",
    projectTitle: "Mobile Payment App",
    industry: "FinTech",
    week: 3,
    totalWeeks: 6,
    members: [
      { name: "Tom Wilson", role: "UI/UX Designer", status: "active" },
      { name: "Kate Anderson", role: "Frontend Dev", status: "active" },
      { name: "Ryan Clark", role: "Backend Dev", status: "active" },
    ],
    mentor: "John Smith",
    lastActivity: "2 hours ago",
    status: "on-track",
  },
  {
    id: 2,
    pmName: "Mike Johnson",
    projectTitle: "Healthcare Dashboard",
    industry: "Healthcare",
    week: 2,
    totalWeeks: 8,
    members: [
      { name: "Lisa Wong", role: "UI/UX Designer", status: "active" },
      { name: "Chris Lee", role: "Backend Dev", status: "at-risk" },
      { name: "Amy Foster", role: "Data Scientist", status: "active" },
    ],
    mentor: "Maria Garcia",
    lastActivity: "1 day ago",
    status: "at-risk",
  },
  {
    id: 3,
    pmName: "Alex Rodriguez",
    projectTitle: "Inventory System",
    industry: "E-commerce",
    week: 1,
    totalWeeks: 4,
    members: [
      { name: "David Brown", role: "Frontend Dev", status: "active" },
      { name: "Kate Wilson", role: "Backend Dev", status: "active" },
    ],
    mentor: "Lisa Wong",
    lastActivity: "3 hours ago",
    status: "on-track",
  },
];

export function TeamOversight() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  console.log(selectedRequest);
  const [adminNote, setAdminNote] = useState("");

  const handleApproval = (requestId: number, approved: boolean) => {
    console.log(
      `Request ${requestId} ${
        approved ? "approved" : "rejected"
      } with note: ${adminNote}`
    );
    setAdminNote("");
    setSelectedRequest(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "approved":
        return "default";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getTeamStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "default";
      case "at-risk":
        return "secondary";
      case "delayed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Team Oversight</h1>
        <p className="text-muted-foreground">
          Manage team member removal requests and monitor team health
        </p>
      </div>

      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests">
            Removal Requests (
            {removalRequests.filter((r) => r.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="teams">
            Active Teams ({activeTeams.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Team Member Removal Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PM / Project</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {removalRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.pmName}</div>
                          <div className="text-sm text-muted-foreground">
                            {request.projectTitle}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {request.memberName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {request.memberRole}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {request.requestDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`flex items-center ${getPriorityColor(
                            request.priority
                          )}`}
                        >
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          {request.priority}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {request.status === "pending" && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedRequest(request)}
                              >
                                <MessageSquare className="mr-1 h-3 w-3" />
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>
                                  Review Removal Request
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">
                                      Product Manager
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      {request.pmName}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">
                                      Project
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      {request.projectTitle}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">
                                      Team Member
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      {request.memberName} ({request.memberRole}
                                      )
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">
                                      Request Date
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      {request.requestDate}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">
                                    Reason for Removal
                                  </label>
                                  <div className="mt-1 p-3 bg-muted rounded-md">
                                    <p className="text-sm">{request.reason}</p>
                                  </div>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">
                                    Admin Note (Optional)
                                  </label>
                                  <Textarea
                                    placeholder="Add a note with your decision rationale..."
                                    value={adminNote}
                                    onChange={(e) =>
                                      setAdminNote(e.target.value)
                                    }
                                    className="mt-1"
                                  />
                                </div>

                                <div className="flex space-x-2 pt-4">
                                  <Button
                                    onClick={() =>
                                      handleApproval(request.id, true)
                                    }
                                    className="flex-1"
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Approve Removal
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={() =>
                                      handleApproval(request.id, false)
                                    }
                                    className="flex-1"
                                  >
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Reject Request
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams">
          <div className="grid gap-6">
            {activeTeams.map((team) => (
              <Card key={team.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {team.projectTitle}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        PM: {team.pmName} • {team.industry} • Week {team.week}/
                        {team.totalWeeks}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getTeamStatusColor(team.status)}>
                        {team.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Last activity: {team.lastActivity}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <Users className="mr-1 h-3 w-3" />
                        Team Members
                      </h4>
                      <div className="space-y-2">
                        {team.members.map((member, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-muted rounded"
                          >
                            <div>
                              <p className="text-sm font-medium">
                                {member.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {member.role}
                              </p>
                            </div>
                            <Badge
                              variant={
                                member.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {member.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <User className="mr-1 h-3 w-3" />
                        Mentor
                      </h4>
                      <div className="p-2 bg-muted rounded">
                        <p className="text-sm font-medium">{team.mentor}</p>
                        <p className="text-xs text-muted-foreground">
                          Assigned Mentor
                        </p>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Progress</h4>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${(team.week / team.totalWeeks) * 100}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Week {team.week} of {team.totalWeeks}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
