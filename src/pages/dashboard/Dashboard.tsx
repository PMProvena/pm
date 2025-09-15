import { useAuthStore } from "../../store/authStore";
import MentorDashboard from "../mentor/Dashboard";
import SkilledMemberDashboard from "../skilledmember/Dashboard";
import SuperAdminDashboard from "../superadmin/Dashboard";

export default function Dashboard() {
  const { role } = useAuthStore();

  if (role === "SUPER_ADMIN") return <SuperAdminDashboard />;
  if (role === "MENTOR") return <MentorDashboard />;
  if (role === "SKILLED_MEMBER") return <SkilledMemberDashboard />;

  return <p>No dashboard available</p>;
}
