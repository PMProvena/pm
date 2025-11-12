/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { UsersResponse } from "@/api/interfaces/user";
import { useGetAllUsers } from "@/hooks/users/useGetAllUsers";
import { formatDate } from "@/lib/utils";
import Error from "@/pages/landing/components/error/Error";
import { Ban, Edit, MoreHorizontal, Search, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function UserManagement() {
  const navigate = useNavigate();

  const {
    data: AllUsers,
    isPending,
    isError,
    refetch: refetchUsers,
  } = useGetAllUsers() as {
    data?: UsersResponse;
    isPending: boolean;
    isError: boolean;
    refetch: () => void;
  };

  const [searchTerm, setSearchTerm] = useState("");

  // Filter users by role
  const usersByRole = useMemo(() => {
    if (!AllUsers?.data) return { pm: [], mentor: [], "skilled-member": [] };

    return AllUsers.data.reduce(
      (acc: any, user: any) => {
        const role = user.role;
        if (role === "pm") acc.pm.push(user);
        else if (role === "mentor") acc.mentor.push(user);
        else if (role === "skilled-member") acc["skilled-member"].push(user);
        return acc;
      },
      { pm: [], mentor: [], "skilled-member": [] }
    );
  }, [AllUsers]);

  const filterAndSearch = (users: any[]) =>
    users.filter((u) =>
      `${u.first_name} ${u.last_name} ${u.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  if (isError) return <Error refetchData={refetchUsers} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage PMs, mentors, and skill members
          </p>
        </div>
        <Button
          onClick={() => navigate("/admin/users/new")}
          className="cursor-pointer"
        >
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

      {isPending ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Tabs defaultValue="pm" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pm" className="cursor-pointer">
              Product Managers ({usersByRole.pm.length})
            </TabsTrigger>
            <TabsTrigger value="mentor" className="cursor-pointer">
              Mentors ({usersByRole.mentor.length})
            </TabsTrigger>
            <TabsTrigger value="skilled-member" className="cursor-pointer">
              Skill Members ({usersByRole["skilled-member"].length})
            </TabsTrigger>
          </TabsList>

          {/* PMs */}
          <TabsContent value="pm">
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
                    {filterAndSearch(usersByRole.pm).length > 0 ? (
                      filterAndSearch(usersByRole.pm).map((user) => (
                        <TableRow key={user._id}>
                          <TableCell className="font-medium">
                            {user.first_name} {user.last_name}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.active_projects || "---"}</TableCell>
                          <TableCell>
                             {user.status || "---"}
                            {/* <Badge variant="default">
                              {user.status || "---"}
                            </Badge> */}
                          </TableCell>
                          <TableCell>
                            {user.created_at
                              ? formatDate(user.created_at)
                              : "---"}
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
                                  Ban User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center text-muted-foreground"
                        >
                          Not found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mentors */}
          <TabsContent value="mentor">
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
                      <TableHead>Experience Level</TableHead>
                      <TableHead>Active Projects</TableHead>
                      <TableHead>Skills</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[70px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterAndSearch(usersByRole.pm).length > 0 ? (
                      filterAndSearch(usersByRole.mentor).map((user) => (
                        <TableRow key={user._id}>
                          <TableCell className="font-medium">
                            {user.first_name} {user.last_name}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.experience_level}</TableCell>
                          <TableCell>{user.active_projects || "---"}</TableCell>
                          <TableCell>
                            {user.skills?.length
                              ? user.skills.join(", ")
                              : "---"}
                          </TableCell>
                          <TableCell>
                             {user.status || "---"}
                            {/* <Badge variant="default">
                              {user.status || "---"}
                            </Badge> */}
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
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center text-muted-foreground"
                        >
                          Not found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skilled Members */}
          <TabsContent value="skilled-member">
            <Card>
              <CardHeader>
                <CardTitle>Skill Members</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Skills</TableHead>
                      <TableHead>Active Projects</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[70px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterAndSearch(usersByRole.pm).length > 0 ? (
                      filterAndSearch(usersByRole["skilled-member"]).map(
                        (user) => (
                          <TableRow key={user._id}>
                            <TableCell className="font-medium">
                              {user.first_name} {user.last_name}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              {user.skills?.length
                                ? user.skills.join(", ")
                                : "---"}
                            </TableCell>
                            <TableCell>
                              {user.active_projects || "---"}
                            </TableCell>
                            <TableCell>
                               {user.status || "---"}
                              {/* <Badge variant="default">
                                {user.status || "---"}
                              </Badge> */}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
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
                        )
                      )
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center text-muted-foreground"
                        >
                          Not found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
