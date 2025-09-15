import { Ban, Edit, MoreHorizontal, Search, UserPlus } from "lucide-react";
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
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const pms = [
  { id: 1, name: "Sarah Chen", email: "sarah.chen@email.com", projects: 2, status: "active", joinDate: "2024-01-15" },
  { id: 2, name: "Mike Johnson", email: "mike.j@email.com", projects: 1, status: "active", joinDate: "2024-02-20" },
  { id: 3, name: "Emily Davis", email: "emily.d@email.com", projects: 3, status: "inactive", joinDate: "2024-01-08" },
  { id: 4, name: "Alex Rodriguez", email: "alex.r@email.com", projects: 1, status: "active", joinDate: "2024-03-05" },
];

const mentors = [
  { id: 1, name: "John Smith", email: "john.smith@email.com", expertise: "Product Strategy", activeProjects: 3, rating: 4.8, status: "active" },
  { id: 2, name: "Lisa Wong", email: "lisa.wong@email.com", expertise: "UX Research", activeProjects: 2, rating: 4.9, status: "active" },
  { id: 3, name: "David Brown", email: "david.b@email.com", expertise: "Technical PM", activeProjects: 1, rating: 4.7, status: "inactive" },
  { id: 4, name: "Maria Garcia", email: "maria.g@email.com", expertise: "Data Analytics", activeProjects: 4, rating: 4.8, status: "active" },
];

const skillMembers = [
  { id: 1, name: "Tom Wilson", email: "tom.w@email.com", skill: "UI/UX Design", projects: 5, rating: 4.6, available: true },
  { id: 2, name: "Kate Anderson", email: "kate.a@email.com", skill: "Frontend Dev", projects: 3, rating: 4.8, available: true },
  { id: 3, name: "Chris Lee", email: "chris.l@email.com", skill: "Backend Dev", projects: 4, rating: 4.7, available: false },
  { id: 4, name: "Amy Foster", email: "amy.f@email.com", skill: "Mobile Dev", projects: 2, rating: 4.9, available: true },
  { id: 5, name: "Ryan Clark", email: "ryan.c@email.com", skill: "Data Science", projects: 6, rating: 4.5, available: true },
];

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage PMs, mentors, and skill members</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="pms" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pms">Product Managers ({pms.length})</TabsTrigger>
          <TabsTrigger value="mentors">Mentors ({mentors.length})</TabsTrigger>
          <TabsTrigger value="skills">Skill Members ({skillMembers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pms">
          <Card>
            <CardHeader>
              <CardTitle>Product Managers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Active Projects</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pms.map((pm) => (
                    <TableRow key={pm.id}>
                      <TableCell className="font-medium">{pm.name}</TableCell>
                      <TableCell>{pm.email}</TableCell>
                      <TableCell>{pm.projects}</TableCell>
                      <TableCell>
                        <Badge variant={pm.status === "active" ? "default" : "secondary"}>
                          {pm.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{pm.joinDate}</TableCell>
                      <TableCell>
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
                              <Ban className="mr-2 h-4 w-4" />
                              Ban User
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

        <TabsContent value="mentors">
          <Card>
            <CardHeader>
              <CardTitle>Mentors</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Expertise</TableHead>
                    <TableHead>Active Projects</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mentors.map((mentor) => (
                    <TableRow key={mentor.id}>
                      <TableCell className="font-medium">{mentor.name}</TableCell>
                      <TableCell>{mentor.email}</TableCell>
                      <TableCell>{mentor.expertise}</TableCell>
                      <TableCell>{mentor.activeProjects}</TableCell>
                      <TableCell>⭐ {mentor.rating}</TableCell>
                      <TableCell>
                        <Badge variant={mentor.status === "active" ? "default" : "secondary"}>
                          {mentor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
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
                              <Ban className="mr-2 h-4 w-4" />
                              Remove
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

        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Skill Members</CardTitle>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by skill" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                    <SelectItem value="frontend">Frontend Dev</SelectItem>
                    <SelectItem value="backend">Backend Dev</SelectItem>
                    <SelectItem value="mobile">Mobile Dev</SelectItem>
                    <SelectItem value="data">Data Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Skill</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {skillMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.skill}</TableCell>
                      <TableCell>{member.projects}</TableCell>
                      <TableCell>⭐ {member.rating}</TableCell>
                      <TableCell>
                        <Badge variant={member.available ? "default" : "secondary"}>
                          {member.available ? "Available" : "Busy"}
                        </Badge>
                      </TableCell>
                      <TableCell>
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
                              <Ban className="mr-2 h-4 w-4" />
                              Remove
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
      </Tabs>
    </div>
  );
}