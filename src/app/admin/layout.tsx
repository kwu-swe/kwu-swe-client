import AdminLayout from "@/components/admin/(common)/Layout";
import useUser from "@/hook/useUser";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const { user } = useUser();
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
