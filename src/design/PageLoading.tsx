import { cn } from "fast-jsx/util";

export default function PageLoading() {
  const styles = {
    container: {
      displays: "flex flex-col items-center justify-center",
      sizes: "w-full min-h-screen",
      backgrounds: "bg-kw-background bg-cover",
    },
    wrapper: {
      displays: "flex flex-col items-center gap-y-4",
      sizes: "w-full max-w-md px-4",
    },
    card: {
      displays: "w-full flex flex-col items-center",
      backgrounds: "bg-white/90 backdrop-blur-sm",
      shapes: "rounded-2xl",
      shadows: "shadow-card",
      paddings: "p-8",
    },
    spinner: {
      sizes: "w-12 h-12",
      borders: "border-4 border-kw-brown/20 border-t-kw-brown",
      shapes: "rounded-full",
      animations: "animate-spin",
    },
    text: {
      font: "text-lg font-medium",
      colors: "text-gray-600",
      margins: "mt-4",
    },
  };

  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.wrapper)}>
        <div className={cn(styles.card)}>
          <div className={cn(styles.spinner)} />
          <p className={cn(styles.text)}>페이지를 불러오는 중...</p>
        </div>
      </div>
    </div>
  );
}
