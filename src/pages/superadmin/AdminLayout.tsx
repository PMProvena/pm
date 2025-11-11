import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import {
  Award,
  BarChart3,
  CheckCircle,
  FolderOpen,
  LogOut,
  UserCheck,
  UserCog,
  Users,
} from "lucide-react";
import { Button } from "./components/ui/button";

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "users", label: "User Management", icon: Users },
  { id: "projects", label: "Project Management", icon: FolderOpen },
  { id: "teams", label: "Team Oversight", icon: UserCheck },
  { id: "mentors", label: "Mentor Assignment", icon: UserCog },
  { id: "rewards", label: "Rewards System", icon: Award },
  { id: "quality", label: "Quality Control", icon: CheckCircle },
];

export default function SuperAdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border">
        <div className="p-6">
          <h1 className="text-xl font-semibold text-foreground">Provena</h1>
          <p className="text-sm text-muted-foreground">Super Admin</p>
        </div>

        <nav className="px-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(`/admin/${item.id}`);

            return (
              <NavLink
                key={item.id}
                to={`/admin/${item.id}`}
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-muted-foreground cursor-pointer"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
