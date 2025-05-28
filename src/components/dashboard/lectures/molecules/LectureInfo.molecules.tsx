import { cn } from "fast-jsx/util";

// ** types
import { Lecture } from "@/types/Lecture";

interface Props {
  data: Lecture;
  className?: string;
}

const LectureInfo = ({ data, className }: Props) => {
  const cardStyles = {
    base: "flex flex-col bg-white border border-gray-100 overflow-hidden",
    shadow: "shadow-card",
    rounded: "rounded-xl",
    body: "flex flex-col p-4 md:p-8",
    header:
      "flex flex-row justify-between items-center p-2.5 gap-3 md:gap-5 border-b border-gray-100",
    headerTitle:
      "flex flex-row items-center gap-2 px-2 text-sm text-gray-950 font-semibold",
  };

  const tableStyles = {
    row: "border-b border-gray-100 flex",
    label:
      "py-1 px-4.5 text-gray-500 text-xs font-medium w-[120px] bg-gray-100",
    value: "py-1 px-3 text-gray-700 text-sm flex-1",
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

      <div className="flex flex-col">
        <div className={tableStyles.row}>
          <div className={tableStyles.label}>강의명</div>
          <div className={cn(tableStyles.value, "text-gray-900 font-medium")}>
            {data.courseResponseDto.courseName}
          </div>
        </div>
        <div className={tableStyles.row}>
          <div className={tableStyles.label}>담당 교수</div>
          <div className={tableStyles.value}>{data.professor.name} 교수</div>
        </div>
        <div className={tableStyles.row}>
          <div className={tableStyles.label}>학기</div>
          <div className={tableStyles.value}>
            {data.year}년 {data.semester === "FIRST_SEMESTER" ? "1" : "2"}
            학기
          </div>
        </div>
        <div className={tableStyles.row}>
          <div className={tableStyles.label}>강의실</div>
          <div className={tableStyles.value}>
            {data?.lectureTimeAndLocation?.map((item, index) => (
              <span key={index}>
                {item.value}호
                {index < data.lectureTimeAndLocation.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </div>
        <div className={tableStyles.row}>
          <div className={tableStyles.label}>수업 시간</div>
          <div className={tableStyles.value}>
            {data?.lectureTimeAndLocation?.map((item, index) => {
              const [day, period] = item.key.split("_");
              return (
                <span key={index}>
                  {day === "MON"
                    ? "월"
                    : day === "TUE"
                    ? "화"
                    : day === "WED"
                    ? "수"
                    : day === "THU"
                    ? "목"
                    : day === "FRI"
                    ? "금"
                    : "토"}
                  요일 {period}교시
                  {index < data.lectureTimeAndLocation.length - 1 ? ", " : ""}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureInfo;
