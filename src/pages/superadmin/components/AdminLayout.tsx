import { useAuthStore } from "@/store/authStore";
import {
  Award,
  BarChart3,
  CheckCircle,
  FolderOpen,
  LogOut,
  UserCheck,
  UserCog,
  Users
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "users", label: "User Management", icon: Users },
  { id: "projects", label: "Project Management", icon: FolderOpen },
  { id: "teams", label: "Team Oversight", icon: UserCheck },
  { id: "mentors", label: "Mentor Assignment", icon: UserCog },
  { id: "rewards", label: "Rewards System", icon: Award },
  { id: "quality", label: "Quality Control", icon: CheckCircle },
];

export function AdminLayout({
  children,
  activeTab,
  setActiveTab,
}: AdminLayoutProps) {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border">
        <div className="p-6">
          <h1 className="text-xl font-semibold text-foreground">
            Provena
          </h1>
          <p className="text-sm text-muted-foreground">Super Admin</p>
        </div>

        <nav className="px-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-muted-foreground"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
