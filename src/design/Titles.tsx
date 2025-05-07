import { Titles } from "fast-jsx/interface";
import { cn } from "fast-jsx/util";

export default function TitleBox({ title, subtitle }: Titles) {
  const container = {
    // 모바일에서는 gap-y-1, sm 브레이크포인트 이상에서는 gap-y-1.5를 적용합니다.
    displays: "flex flex-col gap-y-1 sm:gap-y-1.5",
    fonts: "leading-none",
  };
  return (
    <div className={cn(container)}>
      <div className="text-lg sm:text-xl font-bold">{title}</div>
      {subtitle && <div className="text-sm sm:text-base">{subtitle}</div>}
    </div>
  );
}
