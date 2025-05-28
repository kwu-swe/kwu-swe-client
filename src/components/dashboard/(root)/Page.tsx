import { cn } from "fast-jsx/util";

// ** Hooks
import useUser from "@/hook/useUser";
import useLecture from "@/hook/useLecture";

// ** design
import ComponentLoading from "@/design/ComponentLoading";

// ** Organisms
import TimeTable from "./organism/Timetable.organism";
import SubjectList from "./organism/SubjectList.organism";

export default function Dashboard() {
  const { user } = useUser();
  const { studentLectures: lectures, isLoading } = useLecture();

  const container = {
    displays: "flex flex-col gap-y-10 pb-20",
    sizes: "w-full",
  };

  if (isLoading) {
    return <ComponentLoading />;
  }

  if (!lectures || lectures.length === 0) {
    return (
      <div className={cn(container)}>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">수강 중인 강의가 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(container)}>
      <TimeTable lectures={lectures} />
      <SubjectList lectures={lectures} />
    </div>
  );
}
