import { cn } from "fast-jsx/util";
import { useLocation, useNavigate } from "react-router-dom";

interface Route {
  name: string;
  path: string;
}
const routes: Route[] = [
  {
    name: "홈",
    path: "/admin",
  },
  {
    name: "강의실 관리",
    path: "/admin/locations",
  },
  {
    name: "코스 관리",
    path: "/admin/courses",
  },
];
export default function Navigator() {
  const location = useLocation();
  const path = location.pathname;
  const router = useNavigate();
  const container = {
    paddings: "pl-3.5",
    displays: "flex flex-col gap-y-1.5",
    sizes: "w-48 ",
  };
  const buttonBox = (isSelected?: boolean) => ({
    displays: "flex items-center justify-center",
    fonts: "leading-none",
    paddings: "py-3.5",
    fontColor: isSelected ? "text-white" : "text-kw-brown",
    backgrounds: isSelected ? "bg-kw-brown" : "bg-white shadow-md",
  });
  return (
    <div className={cn(container)}>
      {routes.map((route) => (
        <button
          key={route.path}
          className={cn(buttonBox(path === route.path))}
          onClick={() => router(route.path)}
        >
          {route.name}
        </button>
      ))}
    </div>
  );
}
