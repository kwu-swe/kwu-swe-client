import { cn } from "fast-jsx/util";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

// ** hooks
import useUser from "@/hook/useUser";
import useToken from "@/hook/useToken";

// ** icons
import { MdLogout, MdOutlinePerson, MdClose } from "react-icons/md";

export default function Header() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isLoading: isUserLoading } = useUser();
  const { logoutToken } = useToken();

  const handleActualLogout = async () => {
    try {
      logoutToken();
      queryClient.removeQueries({ queryKey: ["user"] });
      navigate("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const container = {
    displays: "flex items-center justify-between px-5",
    boundaries: "border-b border-gray-100",
    backgrounds: "bg-white",
    sizes: "w-full h-16",
    positions: "relative",
    zIndex: "z-50",
  };

  const logoContainer = {
    displays:
      "flex items-center cursor-pointer gap-x-2 transition-all duration-150 ease-in-out hover:opacity-80 active:scale-95",
    logoImage: "h-8 w-auto",
    logoText: "text-xl font-extrabold text-kw-brown",
  };

  const userDisplayContainer = {
    base: "flex items-center gap-x-2 sm:gap-x-3",
  };

  const userInfoDesktop = {
    base: "hidden md:flex items-center gap-2",
    name: "text-sm text-gray-800 font-medium",
    studentId: "text-sm text-gray-500",
  };

  const logoutButton = {
    base: "p-1 rounded text-gray-500 transition-all duration-150 ease-in-out hover:bg-gray-100 hover:text-red-500 hover:scale-105 active:scale-95 active:bg-gray-200 mt-0.5",
    icon: "w-5 h-5",
  };

  const mobileMenuButton = {
    base: "p-1.5 rounded md:hidden transition-all duration-150 ease-in-out hover:bg-gray-100 hover:scale-105 active:scale-95 active:bg-gray-200",
    icon: "text-gray-600 w-5 h-5",
  };

  const mobileMenuContainer = {
    base: "absolute top-full right-0 mt-1 w-52 bg-white rounded-md shadow-lg border border-gray-100 p-2 md:hidden",
    item: "block w-full text-left px-3 py-2 text-sm text-gray-700 rounded-md flex items-center gap-2 transition-all duration-150 ease-in-out hover:bg-gray-50 hover:text-kw-brown hover:translate-x-1 active:bg-gray-100 active:scale-[0.98]",
    userInfo: "px-3 pt-1.5 pb-2 border-b border-gray-100 mb-1",
    userName: "text-sm font-semibold text-gray-800",
    userStudentId: "text-xs text-gray-500 mt-0.5",
  };

  const handleLogoClick = () => {
    navigate("/dashboard");
    setIsMobileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    handleActualLogout();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={cn(container)}>
      <div className={cn(logoContainer.displays)} onClick={handleLogoClick}>
        <img
          src="/android-chrome-512x512.png"
          alt="KLAS 로고"
          className={cn(logoContainer.logoImage)}
        />
        <span className={cn(logoContainer.logoText)}>KLAS</span>
      </div>

      <div className={cn(userDisplayContainer.base)}>
        {user ? (
          <>
            <div className={cn(userInfoDesktop.base)}>
              <div>
                <span className={cn(userInfoDesktop.name)}>{user.name}</span>
                <span className={cn(userInfoDesktop.studentId)}>
                  ({user.code || "학번 정보 없음"})
                </span>
              </div>
              <button
                onClick={handleLogoutClick}
                className={cn(logoutButton.base)}
                title="로그아웃"
              >
                <MdLogout className={cn(logoutButton.icon)} />
              </button>
            </div>

            <button
              className={cn(mobileMenuButton.base)}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <MdClose className={cn(mobileMenuButton.icon)} />
              ) : (
                <MdOutlinePerson className={cn(mobileMenuButton.icon)} />
              )}
            </button>
          </>
        ) : isUserLoading ? (
          <div className="text-sm text-gray-500">로딩중...</div>
        ) : (
          <button
            onClick={() => navigate("/sign-in")}
            className="text-sm font-medium text-kw-brown hover:underline transition-all duration-150 ease-in-out hover:opacity-80 active:opacity-60 active:scale-95"
          >
            로그인
          </button>
        )}
      </div>

      {isMobileMenuOpen && user && (
        <div className={cn(mobileMenuContainer.base)}>
          <div className={cn(mobileMenuContainer.userInfo)}>
            <p className={cn(mobileMenuContainer.userName)}>{user.name}</p>
            <p className={cn(mobileMenuContainer.userStudentId)}>
              {user.code || "학번 정보 없음"}
            </p>
          </div>
          <button
            onClick={handleLogoutClick}
            className={cn(mobileMenuContainer.item)}
          >
            <MdLogout className="w-4 h-4 text-gray-500 mr-2" />
            로그아웃
          </button>
        </div>
      )}
    </header>
  );
}
