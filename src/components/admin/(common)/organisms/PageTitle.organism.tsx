import { cn } from "fast-jsx/util";

interface PageTitleProps {
  title?: string;
  subtitle?: string;
  showWelcome?: boolean;
  userName?: string;
}

export default function PageTitle({
  title,
  subtitle,
  showWelcome = false,
  userName,
}: PageTitleProps) {
  const welcomeSection = {
    container: "mb-8",
    title: "text-3xl md:text-4xl font-bold text-gray-900 mb-2",
    subtitle: "text-lg text-gray-600",
    accent: "text-kw-brown font-semibold",
  };

  const headerSection = {
    container: "mb-8",
    title: "text-2xl md:text-3xl font-bold text-gray-900 mb-2",
    subtitle: "text-base text-gray-600",
  };

  // 환영 메시지 (홈페이지용)
  if (showWelcome) {
    return (
      <div className={cn(welcomeSection.container)}>
        <h1 className={cn(welcomeSection.title)}>
          안녕하세요,{" "}
          <span className={cn(welcomeSection.accent)}>{userName}</span> 교수님
          👋
        </h1>
        <p className={cn(welcomeSection.subtitle)}>
          오늘도 광운대학교 학사 관리 시스템에 오신 것을 환영합니다.
        </p>
      </div>
    );
  }

  // 일반 페이지 제목 (title이 있을 때만 표시)
  if (!title) return null;

  return (
    <div className={cn(headerSection.container)}>
      <h1 className={cn(headerSection.title)}>{title}</h1>
      {subtitle && <p className={cn(headerSection.subtitle)}>{subtitle}</p>}
    </div>
  );
}
