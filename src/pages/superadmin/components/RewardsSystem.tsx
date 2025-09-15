/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Award,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Star,
  TrendingUp,
  Users
} from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const pointsStats = [
  { title: "Total Points Distributed", value: "245,890", change: "+12%", icon: Award },
  { title: "Pending Conversions", value: "$2,340", change: "+8%", icon: DollarSign },
  { title: "Active Earners", value: "189", change: "+15%", icon: Users },
  { title: "Monthly Payouts", value: "$8,750", change: "+22%", icon: TrendingUp }
];

const mentorEarnings = [
  {
    id: 1,
    name: "John Smith",
    totalPoints: 2850,
    monthlyPoints: 450,
    projectsCompleted: 6,
    avgRating: 4.8,
    pendingPayout: 0,
    lastEarned: "2 days ago"
  },
  {
    id: 2,
    name: "Lisa Wong",
    totalPoints: 2400,
    monthlyPoints: 380,
    projectsCompleted: 4,
    avgRating: 4.9,
    pendingPayout: 2400,
    lastEarned: "1 day ago"
  },
  {
    id: 3,
    name: "David Brown",
    totalPoints: 3100,
    monthlyPoints: 520,
    projectsCompleted: 8,
    avgRating: 4.7,
    pendingPayout: 0,
    lastEarned: "3 hours ago"
  },
  {
    id: 4,
    name: "Maria Garcia",
    totalPoints: 2650,
    monthlyPoints: 420,
    projectsCompleted: 5,
    avgRating: 4.8,
    pendingPayout: 1800,
    lastEarned: "5 hours ago"
  }
];

const skillMemberEarnings = [
  {
    id: 1,
    name: "Tom Wilson",
    skill: "UI/UX Design",
    totalPoints: 1850,
    monthlyPoints: 290,
    projectsCompleted: 4,
    avgRating: 4.6,
    pendingPayout: 1850,
    lastEarned: "1 day ago"
  },
  {
    id: 2,
    name: "Kate Anderson",
    skill: "Frontend Dev",
    totalPoints: 1650,
    monthlyPoints: 310,
    projectsCompleted: 3,
    avgRating: 4.8,
    pendingPayout: 0,
    lastEarned: "2 days ago"
  },
  {
    id: 3,
    name: "Chris Lee",
    skill: "Backend Dev",
    totalPoints: 2100,
    monthlyPoints: 380,
    projectsCompleted: 5,
    avgRating: 4.7,
    pendingPayout: 1200,
    lastEarned: "6 hours ago"
  },
  {
    id: 4,
    name: "Amy Foster",
    skill: "Mobile Dev",
    totalPoints: 1450,
    monthlyPoints: 250,
    projectsCompleted: 3,
    avgRating: 4.9,
    pendingPayout: 0,
    lastEarned: "3 days ago"
  }
];

const conversionRequests = [
  {
    id: 1,
    name: "Lisa Wong",
    role: "Mentor",
    pointsToConvert: 2400,
    dollarAmount: 240,
    requestDate: "2024-03-10",
    status: "pending"
  },
  {
    id: 2,
    name: "Tom Wilson",
    role: "UI/UX Designer",
    pointsToConvert: 1850,
    dollarAmount: 185,
    requestDate: "2024-03-09",
    status: "pending"
  },
  {
    id: 3,
    name: "Chris Lee",
    role: "Backend Dev",
    pointsToConvert: 1200,
    dollarAmount: 120,
    requestDate: "2024-03-08",
    status: "approved"
  }
];

export function RewardsSystem() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  console.log(selectedRequest);

  const handleConversionApproval = (requestId: number, approved: boolean) => {
    console.log(`Conversion request ${requestId} ${approved ? 'approved' : 'rejected'}`);
    setSelectedRequest(null);
  };

  const calculateConversionRate = (points: number) => {
    return (points * 0.1).toFixed(2); // 10 points = $1
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rewards System</h1>
        <p className="text-muted-foreground">Manage points, earnings, and payout conversions</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {pointsStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                  {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="mentors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="mentors">Mentor Earnings</TabsTrigger>
          <TabsTrigger value="skills">Skill Member Earnings</TabsTrigger>
          <TabsTrigger value="conversions">Conversion Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="mentors">
          <Card>
            <CardHeader>
              <CardTitle>Mentor Points & Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mentor</TableHead>
                    <TableHead>Total Points</TableHead>
                    <TableHead>Monthly Points</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Pending Payout</TableHead>
                    <TableHead>Last Earned</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mentorEarnings.map((mentor) => (
                    <TableRow key={mentor.id}>
                      <TableCell className="font-medium">{mentor.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Award className="mr-1 h-3 w-3 text-yellow-600" />
                          {mentor.totalPoints.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          +{mentor.monthlyPoints}
                        </Badge>
                      </TableCell>
                      <TableCell>{mentor.projectsCompleted}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {mentor.avgRating}
                        </div>
                      </TableCell>
                      <TableCell>
                        {mentor.pendingPayout > 0 ? (
                          <Badge variant="outline">
                            ${calculateConversionRate(mentor.pendingPayout)}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">$0</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {mentor.lastEarned}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skill Member Points & Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Skill</TableHead>
                    <TableHead>Total Points</TableHead>
                    <TableHead>Monthly Points</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Pending Payout</TableHead>
                    <TableHead>Last Earned</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {skillMemberEarnings.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{member.skill}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Award className="mr-1 h-3 w-3 text-yellow-600" />
                          {member.totalPoints.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          +{member.monthlyPoints}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.projectsCompleted}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {member.avgRating}
                        </div>
                      </TableCell>
                      <TableCell>
                        {member.pendingPayout > 0 ? (
                          <Badge variant="outline">
                            ${calculateConversionRate(member.pendingPayout)}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">$0</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {member.lastEarned}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversions">
          <Card>
            <CardHeader>
              <CardTitle>Point Conversion Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Points to Convert</TableHead>
                    <TableHead>Dollar Amount</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conversionRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{request.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Award className="mr-1 h-3 w-3 text-yellow-600" />
                          {request.pointsToConvert.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center font-medium">
                          <DollarSign className="mr-1 h-3 w-3 text-green-600" />
                          {request.dollarAmount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {request.requestDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={request.status === "pending" ? "secondary" : "default"}>
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
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Review Conversion Request</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Requestor</label>
                                    <p className="text-sm text-muted-foreground">{request.name} ({request.role})</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Request Date</label>
                                    <p className="text-sm text-muted-foreground">{request.requestDate}</p>
                                  </div>
                                </div>
                                
                                <div className="p-4 bg-muted rounded-lg">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm">Points to Convert:</span>
                                    <span className="font-medium">{request.pointsToConvert.toLocaleString()}</span>
                                  </div>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm">Conversion Rate:</span>
                                    <span className="text-sm text-muted-foreground">10 points = $1</span>
                                  </div>
                                  <div className="flex items-center justify-between font-medium">
                                    <span>Total Payout:</span>
                                    <span className="text-green-600">${request.dollarAmount}</span>
                                  </div>
                                </div>

                                <div className="flex space-x-2 pt-4">
                                  <Button 
                                    onClick={() => handleConversionApproval(request.id, true)}
                                    className="flex-1"
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Approve Conversion
                                  </Button>
                                  <Button 
                                    variant="outline"
                                    onClick={() => handleConversionApproval(request.id, false)}
                                    className="flex-1"
                                  >
                                    Reject
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
      </Tabs>
    </div>
  );
}