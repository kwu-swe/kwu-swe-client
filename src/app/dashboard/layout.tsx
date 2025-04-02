import DashboardLayout from "@/components/dashboard/(common)/Layout";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
