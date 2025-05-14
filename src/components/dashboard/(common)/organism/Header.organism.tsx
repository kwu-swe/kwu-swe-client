import { cn } from "fast-jsx/util";
import { useNavigate } from "react-router-dom";
import useUser from "@/hook/useUser";
import { useUserStore } from "@/store";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { clearUser } = useUserStore();

  const container = {
    displays: "flex items-center justify-between px-4 sm:px-6",
    boundaries: "border-b border-gray-100",
    backgrounds: "bg-white",
    sizes: "w-full h-[3.5rem]",
    positions: "relative",
    zIndex: "z-50",
    effects: "shadow-[0_0_10px_0_rgba(0,0,0,0.1)]",
  };

  const logoText = {
    fonts: "text-2xl sm:text-3xl font-black text-kw-brown tracking-tight",
    interactions: "cursor-pointer hover:text-kw-brown/80",
    transitions: "transition-all duration-300",
  };

  const subText = {
    fonts:
      "text-sm sm:text-base font-medium text-gray-400/80 select-none mb-0.5",
    displays: "hidden sm:block",
    effects: "drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]",
  };

  const userInfo = {
    displays: "flex items-center gap-x-3 sm:gap-x-6",
    fonts: "text-sm",
  };

  const userText = {
    fonts: "font-semibold text-gray-700 select-none",
    displays: "flex items-center gap-x-1.5 sm:gap-x-2",
  };

  const userCode = {
    fonts: "text-gray-500",
    displays: "hidden sm:inline",
  };

  const logoutButton = {
    fonts: "text-sm font-medium",
    backgrounds: "bg-gray-100 hover:bg-gray-200",
    boundaries: "rounded-full",
    paddings: "px-3 sm:px-4 py-0.5",
    interactions: "cursor-pointer",
    transitions: "transition-all duration-200",
  };

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    clearUser();
    navigate("/sign-in");
  };

  return (
    <header className={cn(container)}>
      <div className="flex items-baseline gap-x-1.5 sm:gap-x-2">
        <span className={cn(logoText)} onClick={handleLogoClick}>
          KLAS
        </span>
        <span className={cn(subText)}>학사관리시스템</span>
      </div>
      <div className={cn(userInfo)}>
        <div className={cn(userText)}>
          <span>{user?.name}</span>
          <span className={cn(userCode)}>({user?.code})</span>
        </div>
        <button className={cn(logoutButton)} onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </header>
  );
}
