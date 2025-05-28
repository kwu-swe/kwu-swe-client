import { cn } from "fast-jsx/util";

// ** design
import TitleBox from "@/design/Titles";

// ** molecules
import LectureCard from "@/components/dashboard/lectures/molecules/LectureCard.molecules";

// ** types
import { Lecture } from "@/types/Lecture";

interface Props {
  lectures: Lecture[];

}

export default function SubjectList({
  lectures,

}: Props) {
  const container = {
    base: "flex flex-col gap-y-3.5",
    grid: "grid grid-cols-1 gap-3",
  };

  return (
    <div className={cn(container.base)}>
      <TitleBox title="수강 목록" />
      <div className={container.grid}>
        {lectures.map((lecture) => (
          <LectureCard
            key={lecture.lectureId}
            data={lecture}

          />
        ))}
      </div>
    </div>
  );
}
