import DashboardLayout from "@/components/dashboard/(common)/Layout";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
