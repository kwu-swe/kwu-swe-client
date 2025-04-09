import { cn } from "fast-jsx/util";
import SubjectList from "./organism/SubjectList.organism";
import TimeTable from "./organism/Timetable.organism";
import { Lecture } from "@/types/Lecture";

export default function Dashboard() {
  const container = {
    displays: "flex flex-col gap-y-3.5",
    sizes: "w-full",
  };

  return (
    <div className={cn(container)}>
      {/* <TimeTable lectures={lectures} /> */}
      <SubjectList />
    </div>
  );
}
