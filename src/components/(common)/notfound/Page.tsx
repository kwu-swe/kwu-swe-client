import { Button } from "fast-jsx";
import { cn } from "fast-jsx/util";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const router = useNavigate();

  // 스타일 정의
  const styles = {
    container: {
      displays: "flex flex-col items-center justify-center",
      sizes: "w-full min-h-screen",
      backgrounds: "bg-kw-background bg-cover",
    },
    wrapper: {
      displays: "flex flex-col items-center gap-y-6",
      sizes: "w-full max-w-sm px-4",
    },
    card: {
      displays: "w-full flex flex-col items-center",
      backgrounds: "bg-white/95 backdrop-blur-sm",
      shapes: "rounded-3xl",
      shadows: "shadow-lg",
      paddings: "p-10",
    },
    title: {
      font: "text-5xl font-bold",
      colors: "text-kw-brown",
      margins: "mb-3",
    },
    subtitle: {
      font: "text-lg",
      colors: "text-gray-600",
      margins: "mb-10",
    },
    buttonContainer: {
      displays: "flex flex-col gap-3 w-full",
    },
    button: {
      width: "w-full",
      height: "h-12",
      font: "text-lg font-medium",
      colors: "text-white",
      backgrounds: "bg-kw-brown hover:bg-kw-brown/90",
      shapes: "rounded-xl",
      transitions: "transition-all duration-300 hover:scale-105",
    },
    backButton: {
      width: "w-full",
      height: "h-12",
      font: "text-lg font-medium",
      colors: "text-kw-brown",
      backgrounds: "bg-white hover:bg-gray-50",
      borders: "border-2 border-kw-brown",
      shapes: "rounded-xl",
      transitions: "transition-all duration-300 hover:scale-105",
    },
  };

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.wrapper)}>
        <div className={cn(styles.card)}>
          <h1 className={cn(styles.title)}>404</h1>
          <p className={cn(styles.subtitle)}>페이지를 찾을 수 없습니다</p>
          <div className={cn(styles.buttonContainer)}>
            <Button
              title="이전 페이지로 돌아가기"
              onClick={() => router(-1)}
              option={styles.backButton}
            />
            <Button
              title="홈으로 돌아가기"
              onClick={() => router("/")}
              option={styles.button}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
