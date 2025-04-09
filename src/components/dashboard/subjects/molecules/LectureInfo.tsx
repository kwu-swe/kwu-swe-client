import { cn } from "fast-jsx/util";

// ** types
import { Lecture } from "@/types/Lecture";

interface Props {
  data: Lecture;
  className?: string;
}

const LectureInfo = ({ data, className }: Props) => {
  const cardStyles = {
    base: "flex flex-col bg-white border border-gray-100",
    shadow: "shadow-card",
    rounded: "rounded-xl",
    body: "flex flex-col p-4 md:p-8",
    header:
      "flex flex-row justify-between items-center p-2.5 gap-3 md:gap-5 border-b border-gray-100",
    headerTitle:
      "flex flex-row items-center gap-2 px-2 text-sm text-gray-950 font-semibold",
  };

  return (
    <div
      className={cn(
        cardStyles.base,
        cardStyles.rounded,
        "shadow-table",
        className
      )}
    >
      <div className={cardStyles.header}>
        <div className={cardStyles.headerTitle}>
          <span>강의 정보</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-5">
        <div className="flex items-center">
          <p className="text-gray-500 text-xs w-[80px]">강의명</p>
          <p className="text-gray-700 text-sm font-medium">
            {data.courseResponseDto.courseName}
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-gray-500 text-xs w-[80px]">담당 교수</p>
          <p className="text-gray-700 text-sm font-medium">
            {data.professor.name} 교수
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-gray-500 text-xs w-[80px]">학기</p>
          <p className="text-gray-700 text-sm font-medium">
            {data.year.value}년 {data.semester === "FIRST_SEMESTER" ? "1" : "2"}
            학기
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-gray-500 text-xs w-[80px]">강의실</p>
          <p className="text-gray-700 text-sm font-medium">
            {data.lectureScheduleAndLocation[0]?.additionalProp1 || "미정"}
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-gray-500 text-xs w-[80px]">수업 교시</p>
          <p className="text-gray-700 text-sm font-medium">
            {data.lectureScheduleAndLocation[0]?.additionalProp2 || "미정"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LectureInfo;
