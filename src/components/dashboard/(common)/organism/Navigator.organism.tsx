import { cn } from "fast-jsx/util";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineClass,
  MdOutlineEditNote,
  MdOutlineHistoryEdu,
  MdChevronRight,
  MdMenu,
  MdMenuOpen, // 네비게이션 축소 아이콘
  MdExpandMore, // 서브메뉴 확장됨 아이콘
} from "react-icons/md";

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

export default function Navigator() {
  const location = useLocation();
  const path = location.pathname;
  const router = useNavigate();
  const [expandedRoutes, setExpandedRoutes] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // 모바일에서는 기본적으로 닫힌 상태
    if (typeof window !== "undefined" && window.innerWidth < 768) return true;
    // 로컬 스토리지에서 상태 불러오기
    if (typeof localStorage !== "undefined") {
      const saved = localStorage.getItem("navCollapsed");
      return saved ? JSON.parse(saved) : false;
    }
    return false;
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
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("navCollapsed", JSON.stringify(isCollapsed));
    }
  }, [isCollapsed]);

  const toggleRoute = (routePath: string) => {
    setExpandedRoutes((prev) =>
      prev.includes(routePath)
        ? prev.filter((p) => p !== routePath)
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
    paddings: "p-1", // 사이즈 축소에 따른 패딩 조절
    backgrounds: "hover:bg-gray-50",
    boundaries: "rounded-lg",
    fonts: "text-gray-600", // 아이콘 색상 진하게 변경
    effects: "hover:shadow-sm",
    transitions: "transition-all duration-200",
    sizes: "w-7 h-7", // 버튼 사이즈 축소 (w-8 h-8 -> w-7 h-7)
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
    fonts: `leading-none text-sm ${
      isSelected ? "font-semibold" : "font-medium"
    }`, // 활성 시 폰트 두께 변경, 기본 폰트 크기 text-sm
    paddings: isCollapsed ? "px-0 py-2.5" : "pl-8 pr-4 py-2.5", // 높이 줄임 (py-3 -> py-2.5)
    fontColor: isSelected ? "text-kw-brown" : "text-gray-500",
    backgrounds: isSelected ? "bg-amber-50" : "hover:bg-gray-50", // 활성 시 배경색 변경 (bg-gray-50 -> bg-amber-50)
    boundaries: "rounded-lg", // 모서리 둥글기 약간 줄임 (rounded-xl -> rounded-lg)
    transitions: "transition-all duration-200",
  });

  const iconBox = {
    displays: "flex items-center justify-center",
    sizes: "w-8 h-8 min-w-[32px]",
    positions: isCollapsed ? "mx-auto" : "",
  };

  const subIconBox = {
    // 서브메뉴 아이콘 박스 (필요시 패딩 조절)
    displays: "flex items-center justify-center",
    sizes: "w-7 h-7 min-w-[28px]", // 아이콘 박스 크기 약간 줄임
    positions: isCollapsed ? "mx-auto" : "",
  };

  const textBox = {
    displays: "flex items-center",
    sizes: "min-w-0",
    transitions: "transition-all duration-300 ease-in-out",
    positions: "absolute",
    paddings: isCollapsed ? "pl-10" : "pl-10", // 이 부분은 subButtonBox의 pl과 연동되어야 함
    opacities: isCollapsed ? "opacity-0" : "opacity-100",
    visibilities: isCollapsed ? "invisible" : "visible",
    transforms: isCollapsed ? "translate-x-[-8px]" : "translate-x-0",
  };

  // 서브메뉴용 textBox, 아이콘 크기 및 패딩 변경에 따라 조정
  const subTextBox = {
    displays: "flex items-center",
    sizes: "min-w-0",
    transitions: "transition-all duration-300 ease-in-out",
    positions: "absolute",
    paddings: isCollapsed ? "pl-10" : "pl-[44px]", // 아이콘 + 갭 이후부터 텍스트 시작
    opacities: isCollapsed ? "opacity-0" : "opacity-100",
    visibilities: isCollapsed ? "invisible" : "visible",
    transforms: isCollapsed ? "translate-x-[-8px]" : "translate-x-0",
  };

  const selectedIndicator = (isSub?: boolean) => ({
    displays: "absolute left-0 top-1/2 -translate-y-1/2",
    sizes: isSub ? "w-1 h-6" : "w-1 h-8", // 서브 메뉴일 때 높이 h-6
    backgrounds: "bg-kw-brown",
    boundaries: "rounded-r-full",
  });

  return (
    <>
      <div className={cn(...Object.values(container))}>
        <div className={cn(...Object.values(contentWrapper))}>
          <div
            className={cn(
              "h-14 flex items-center border-b border-gray-100",
              isCollapsed ? "justify-center" : "justify-start px-4"
            )}
          >
            <button
              className={cn(...Object.values(toggleButton))}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <MdMenu className="w-5 h-5" />
              ) : (
                <MdMenuOpen className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden pt-3 space-y-1 px-2">
            {" "}
            {/* 네비게이터 전체 좌우 패딩 추가 */}
            {routes.map((route) => {
              const isActive = isRouteActive(route);
              const isExpanded =
                expandedRoutes.includes(route.path) || isActive;
              return (
                <div key={route.path} className="relative">
                  <button
                    className={cn(
                      ...Object.values(buttonBox(path === route.path, isActive))
                    )}
                    onClick={() => {
                      if (route.subRoutes) {
                        if (isCollapsed) {
                          // 축소 상태에서 서브메뉴가 있는 항목 클릭 시 첫번째 서브메뉴로 이동
                          router(route.subRoutes[0].path);
                        } else {
                          toggleRoute(route.path);
                        }
                      } else {
                        router(route.path);
                      }
                    }}
                  >
                    <div className={cn(...Object.values(iconBox))}>
                      <route.icon className="w-5 h-5" />
                    </div>
                    {!isCollapsed && (
                      <div className={cn(...Object.values(textBox))}>
                        <span className="truncate">{route.name}</span>
                      </div>
                    )}
                    {/* 확장/축소 아이콘 (서브메뉴가 있을 경우) */}
                    {!isCollapsed &&
                      route.subRoutes &&
                      (isExpanded ? (
                        <MdExpandMore
                          className={cn(
                            "w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                          )}
                        />
                      ) : (
                        <MdChevronRight
                          className={cn(
                            "w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                          )}
                        />
                      ))}
                    {(path === route.path ||
                      (isActive &&
                        !route.subRoutes?.some((sr) => path === sr.path))) && ( // 부모 라우트 활성 표시 (서브 라우트가 활성 아닐 때만)
                      <div
                        className={cn(...Object.values(selectedIndicator()))}
                      />
                    )}
                  </button>
                  {!isCollapsed && route.subRoutes && isExpanded && (
                    <div className="mt-1 space-y-1 pl-2">
                      {" "}
                      {/* 서브메뉴 들여쓰기 */}
                      {route.subRoutes.map((subRoute) => (
                        <button
                          key={subRoute.path}
                          className={cn(
                            ...Object.values(
                              subButtonBox(path === subRoute.path)
                            )
                          )}
                          onClick={() => router(subRoute.path)}
                        >
                          {subRoute.icon && (
                            <div className={cn(...Object.values(subIconBox))}>
                              {" "}
                              {/* 서브메뉴 아이콘 박스 사용 */}
                              <subRoute.icon className="w-4 h-4" />{" "}
                              {/* 서브메뉴 아이콘 크기 약간 줄임 */}
                            </div>
                          )}
                          {/* 아이콘 유무에 따라 텍스트 위치 조정 */}
                          <div
                            className={cn(
                              ...Object.values(subTextBox),
                              !subRoute.icon
                                ? isCollapsed
                                  ? "pl-10"
                                  : "pl-8"
                                : undefined
                            )}
                          >
                            <span className="truncate">{subRoute.name}</span>
                          </div>
                          {path === subRoute.path && (
                            <div
                              className={cn(
                                ...Object.values(selectedIndicator(true))
                              )}
                            />
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
