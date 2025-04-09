import TitleBox from "@/design/Titles";
import { Lecture } from "@/types/Lecture";
import { cn } from "fast-jsx/util";

interface TimeTableProps {
  lectures: Lecture[];
}

export default function TimeTable({ lectures }: TimeTableProps) {
  const container = {
    displays: "flex flex-col gap-y-3.5",
  };
  const body = {
    displays: "",
    sizes: "w-full h-100",
    boundaries: "border-2",
  };
  const table: (Lecture | null)[][] = Array.from({ length: 9 }, () =>
    Array(6).fill(null)
  );

  return (
    <div className={cn(container)}>
      <TitleBox title="시간표" />
      <div className={cn(body)}></div>
    </div>
  );
}
