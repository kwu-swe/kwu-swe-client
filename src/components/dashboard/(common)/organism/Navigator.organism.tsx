import { cn } from "fast-jsx/util";
import { useNavigate } from "react-router-dom";

interface Route {
  name: string;
  path: string;
}
const routes: Route[] = [
  {
    name: "홈",
    path: "/dashboard",
  },
  {
    name: "수강 관리",
    path: "/dashboard/subjects",
  },
  {
    name: "수강 신청",
    path: "/dashboard/join",
  },
];
export default function Navigator() {
  const router = useNavigate();
  const container = {
    displays: "flex flex-col",
    sizes: "w-48 ",
  };
  const buttonBox = {
    displays: "flex items-center justify-center",
    fonts: "leading-none",
    paddings: "py-3.5",
    backgrounds: "shadow-md",
  };
  return (
    <div className={cn(container)}>
      {routes.map((route) => (
        <button className={cn(buttonBox)} onClick={() => router(route.path)}>
          {route.name}
        </button>
      ))}
    </div>
  );
}
