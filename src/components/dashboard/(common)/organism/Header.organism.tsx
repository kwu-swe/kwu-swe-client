import { cn } from "fast-jsx/util";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const container = {
    displays: "flex items-center justify-between px-5",
    boundaries: "border-b border-gray-100",
    backgrounds: "bg-white",
    sizes: "w-full h-14",
    positions: "relative",
    zIndex: "z-50",
    // effects: "shadow-sm", // 주석 처리된 효과는 유지
  };

  const logoText = {
    fonts: "text-2xl font-extrabold text-kw-brown",
    interactions: "cursor-pointer",
    transitions: "transition-all duration-300",
  };

  const subText = {
    fonts: "text-base text-gray-300",
  };

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  return (
    <header className={cn(container)}>
      <div className="flex items-baseline gap-x-2">
        <span className={cn(logoText)} onClick={handleLogoClick}>
          KLAS
        </span>
        <span className={cn(subText)}>학사관리시스템</span>
      </div>
      {/* 향후 사용자 프로필 또는 알림 아이콘 등이 추가될 수 있는 공간 */}
    </header>
  );
}
