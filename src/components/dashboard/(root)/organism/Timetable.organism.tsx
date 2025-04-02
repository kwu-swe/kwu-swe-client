import TitleBox from "@/design/Titles";
import { cn } from "fast-jsx/util";

export default function TimeTable() {
  const container = {
    displays: "flex flex-col gap-y-3.5",
  };
  const body = {
    displays: "",
    sizes: "w-full h-100",
    boundaries: "border-2",
  };
  return (
    <div className={cn(container)}>
      <TitleBox title="시간표" />
      <div className={cn(body)}></div>
    </div>
  );
}
