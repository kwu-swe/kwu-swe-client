import AdminLayout from "@/components/admin/(common)/Layout";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
