import { Titles } from "fast-jsx/interface";
import { cn } from "fast-jsx/util";

export default function TitleBox({ title, subtitle }: Titles) {
  const container = {
    displays: "flex flex-col gap-y-1.5",
    fonts: "leading-none",
  };
  return (
    <div className={cn(container)}>
      <div className="text-2xl font-bold">{title}</div>
      {subtitle && <div>{subtitle}</div>}
    </div>
  );
}
