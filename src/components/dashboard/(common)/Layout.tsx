import { cn } from "fast-jsx/util";
import { ReactNode } from "react";
import Header from "./organism/Header.organism";
import Navigator, { Route } from "./organism/Navigator.organism";
import {
  MdOutlineSpaceDashboard,
  MdOutlineClass,
  MdOutlineEditNote,
  MdOutlineHistoryEdu,
} from "react-icons/md";

const routes: Route[] = [
  {
    name: "대시보드",
    path: "/dashboard",
    icon: MdOutlineSpaceDashboard,
  },
  {
    name: "강의 관리",
    path: "/dashboard/lectures",
    icon: MdOutlineClass,
    subRoutes: [
      {
        name: "수강 목록",
        path: "/dashboard/lectures/management",
        icon: MdOutlineHistoryEdu,
      },
      {
        name: "수강 신청",
        path: "/dashboard/lectures/register",
        icon: MdOutlineEditNote,
      },
    ],
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const container = {
    displays: "flex flex-col min-h-screen bg-gray-50/40",
    sizes: "w-full",
    positions: "relative",
  };

  const headerWrapper = {
    backgrounds: "bg-white",
    positions: "relative",
    zIndex: "z-50",
  };

  const body = {
    displays: "flex flex-row",
    positions: "relative",
    sizes: "w-full flex-1",
  };

  const content = {
    displays: "flex-1 relative h-full", // bg-white rounded-none md:rounded-lg shadow-sm
    sizes: "p-4 md:p-5 pb-14",
    overflow: "overflow-y-auto",
  };

  const mainContainer = {
    displays: "flex-1",
    sizes: "w-full max-w-full md:max-w-3xl mx-auto",
    // paddings: "p-0 md:p-6",
    overflows: "overflow-hidden",
  };

  return (
    <div className={cn(container)}>
      <div className={cn(headerWrapper)}>
        <Header />
      </div>

      <div className={cn(body)}>
        <Navigator routes={routes} />
        <div className={cn(mainContainer)}>
          <main className={cn(content)}>{children}</main>
        </div>
      </div>
    </div>
  );
}
