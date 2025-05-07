import { cn } from "fast-jsx/util";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// 임시 아이콘 컴포넌트들
const DashboardIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);

const SubjectIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const RegisterIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const HistoryIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

interface SubRoute {
  name: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface Route {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  subRoutes?: SubRoute[];
}

const routes: Route[] = [
  {
    name: "대시보드",
    path: "/dashboard",
    icon: DashboardIcon,
  },
  {
    name: "수강 관리",
    path: "/dashboard/lectures",
    icon: SubjectIcon,
    subRoutes: [
      {
        name: "수강 신청",
        path: "/dashboard/lectures/register",
        icon: RegisterIcon,
      },
      {
        name: "수강 내역",
        path: "/dashboard/lectures/history",
        icon: HistoryIcon,
      },
    ],
  },
];

export default function Navigator() {
  const location = useLocation();
  const path = location.pathname;
  const router = useNavigate();
  const [expandedRoutes, setExpandedRoutes] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // 모바일에서는 기본적으로 닫힌 상태
    if (window.innerWidth < 768) return true;
    // 로컬 스토리지에서 상태 불러오기
    const saved = localStorage.getItem("navCollapsed");
    return saved ? JSON.parse(saved) : false;
  });

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 상태 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("navCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleRoute = (routePath: string) => {
    setExpandedRoutes((prev) =>
      prev.includes(routePath)
        ? prev.filter((path) => path !== routePath)
        : [...prev, routePath]
    );
  };

  const isRouteActive = (route: Route) => {
    if (path === route.path) return true;
    if (
      route.path === "/dashboard/lectures" &&
      path.startsWith("/dashboard/lectures")
    )
      return true;
    if (route.subRoutes?.some((subRoute) => path === subRoute.path))
      return true;
    return false;
  };

  const container = {
    displays: "flex flex-col",
    sizes: isCollapsed ? "w-16 min-w-16" : "w-64 min-w-64 md:w-64 sm:w-64",
    boundaries: "border-r border-gray-100",
    backgrounds: "bg-white",
    transitions: "transition-all duration-300 ease-in-out",
    positions: "relative md:relative fixed md:static",
    zIndex: "z-40",
  };

  const contentWrapper = {
    displays: "flex flex-col",
    positions: "sticky top-0",
    sizes: "h-screen",
    backgrounds: "bg-white",
  };

  const toggleButton = {
    displays: "flex items-center justify-center",
    paddings: "p-2",
    backgrounds: "hover:bg-gray-50",
    boundaries: "rounded-lg",
    fonts: "text-gray-400",
    effects: "hover:shadow-sm",
    transitions: "transition-all duration-200",
    sizes: "w-8 h-8",
  };

  const buttonBox = (isSelected?: boolean, isParentActive?: boolean) => ({
    displays: "flex items-center gap-3 w-full relative",
    fonts: "leading-none text-base font-semibold",
    paddings: isCollapsed ? "px-0 py-3.5" : "px-4 py-3.5",
    fontColor: isSelected || isParentActive ? "text-kw-brown" : "text-gray-600",
    backgrounds:
      isSelected || isParentActive ? "bg-gray-50" : "hover:bg-gray-50",
    effects: isSelected || isParentActive ? "shadow-sm" : "",
    boundaries: "rounded-xl",
    transitions: "transition-all duration-200",
  });

  const subButtonBox = (isSelected?: boolean) => ({
    displays: "flex items-center gap-3 w-full relative",
    fonts: "leading-none text-base font-medium",
    paddings: isCollapsed ? "px-0 py-3" : "pl-12 pr-4 py-3",
    fontColor: isSelected ? "text-kw-brown" : "text-gray-500",
    backgrounds: isSelected ? "bg-gray-50" : "hover:bg-gray-50",
    boundaries: "rounded-xl",
    transitions: "transition-all duration-200",
  });

  const iconBox = {
    displays: "flex items-center justify-center",
    sizes: "w-8 h-8 min-w-[32px]",
    fonts: "text-gray-500",
    positions: isCollapsed ? "mx-auto" : "",
  };

  const textBox = {
    displays: "flex items-center",
    sizes: "min-w-0",
    transitions: "transition-all duration-300 ease-in-out",
    positions: "absolute",
    paddings: isCollapsed ? "pl-12" : "pl-12",
    opacities: isCollapsed ? "opacity-0" : "opacity-100",
    visibilities: isCollapsed ? "invisible" : "visible",
    transforms: isCollapsed ? "translate-x-[-8px]" : "translate-x-0",
  };

  const selectedIndicator = {
    displays: "absolute left-0 top-1/2 -translate-y-1/2",
    sizes: "w-1 h-8",
    backgrounds: "bg-kw-brown",
    boundaries: "rounded-r-full",
  };

  return (
    <>
      <div className={cn(container)}>
        <div className={cn(contentWrapper)}>
          <div
            className={cn(
              "h-14 flex items-center border-b border-gray-100",
              isCollapsed ? "justify-center" : "justify-start px-4"
            )}
          >
            <button
              className={cn(toggleButton)}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <div className="flex flex-col gap-1.5">
                <div
                  className={cn(
                    "h-0.5 bg-gray-400 transition-all duration-300",
                    isCollapsed ? "w-4" : "w-6"
                  )}
                />
                <div
                  className={cn(
                    "h-0.5 bg-gray-400 transition-all duration-300",
                    isCollapsed ? "w-5" : "w-4"
                  )}
                />
                <div
                  className={cn(
                    "h-0.5 bg-gray-400 transition-all duration-300",
                    isCollapsed ? "w-3" : "w-5"
                  )}
                />
              </div>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden pt-3 space-y-1">
            {routes.map((route) => {
              const isActive = isRouteActive(route);
              const isExpanded =
                expandedRoutes.includes(route.path) || isActive;
              return (
                <div key={route.path} className="relative">
                  <button
                    className={cn(buttonBox(path === route.path, isActive))}
                    onClick={() => {
                      if (route.subRoutes) {
                        if (isCollapsed) {
                          router(route.subRoutes[0].path);
                        } else {
                          toggleRoute(route.path);
                        }
                      } else {
                        router(route.path);
                      }
                    }}
                  >
                    <div className={cn(iconBox)}>
                      <route.icon className="w-5 h-5" />
                    </div>
                    <div className={cn(textBox)}>
                      <span className="truncate">{route.name}</span>
                    </div>
                    {(path === route.path || isActive) && (
                      <div className={cn(selectedIndicator)} />
                    )}
                  </button>
                  {!isCollapsed && route.subRoutes && isExpanded && (
                    <div className="mt-1 space-y-1">
                      {route.subRoutes.map((subRoute) => (
                        <button
                          key={subRoute.path}
                          className={cn(subButtonBox(path === subRoute.path))}
                          onClick={() => router(subRoute.path)}
                        >
                          {subRoute.icon && (
                            <div className={cn(iconBox)}>
                              <subRoute.icon className="w-5 h-5" />
                            </div>
                          )}
                          <div className={cn(textBox)}>
                            <span className="truncate">{subRoute.name}</span>
                          </div>
                          {path === subRoute.path && (
                            <div className={cn(selectedIndicator)} />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* 모바일에서 네비게이션이 열려있을 때 배경 오버레이 */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[35] md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
}
