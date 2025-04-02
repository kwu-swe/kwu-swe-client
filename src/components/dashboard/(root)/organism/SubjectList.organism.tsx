import TitleBox from "@/design/Titles";
import { cn } from "fast-jsx/util";

export default function SubjectList() {
  const container = {
    displays: "flex flex-col gap-y-3.5",
  };
  return (
    <div className={cn(container)}>
      <TitleBox title="수강 목록" />
      <div className="w-full h-100 border-2"></div>
    </div>
  );
}
