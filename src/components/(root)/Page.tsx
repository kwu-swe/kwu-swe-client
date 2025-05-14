import { Button } from "fast-jsx";
import { cn } from "fast-jsx/util";
import { useNavigate } from "react-router-dom";

export default function Root() {
  const router = useNavigate();

  // 스타일 정의
  const styles = {
    container: {
      displays: "flex flex-col items-center justify-center",
      sizes: "w-full min-h-screen",
      backgrounds: "bg-kw-background bg-cover",
    },
    wrapper: {
      displays: "flex flex-col items-center gap-y-8",
      sizes: "w-full max-w-md px-4",
    },
    card: {
      displays: "w-full flex flex-col items-center",
      backgrounds: "bg-white/90 backdrop-blur-sm",
      shapes: "rounded-2xl",
      shadows: "shadow-card",
      paddings: "p-8",
    },
    logo: {
      sizes: "w-28 mb-6",
    },
    title: {
      font: "text-3xl font-bold",
      colors: "text-gray-800",
      margins: "mb-2",
    },
    subtitle: {
      font: "text-base",
      colors: "text-gray-500",
      margins: "mb-8",
    },
    button: {
      width: "w-full",
      height: "h-12",
      font: "text-xl font-medium",
      colors: "text-white",
      backgrounds: "bg-kw-brown hover:bg-kw-brown/90",
      transitions: "transition-all duration-300 hover:scale-105",
    },
  };

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.wrapper)}>
        <div className={cn(styles.card)}>
          <img
            src="/android-chrome-512x512.png"
            alt="광운대학교"
            className={cn(styles.logo)}
          />
          <h1 className={cn(styles.title)}>광운대학교</h1>
          <p className={cn(styles.subtitle)}>학사관리 서비스를 시작합니다</p>
          <Button
            title="시작하기"
            onClick={() => router("/sign-in")}
            option={styles.button}
          />
        </div>
      </div>
    </div>
  );
}
