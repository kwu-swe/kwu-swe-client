import { cn } from "fast-jsx/util";

// ** types
import { Lecture } from "@/types/Lecture";
import useLecture from "@/hook/useLecture";

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
    label: "py-2 px-4 text-gray-500 text-xs font-medium w-[120px] bg-gray-100",
    value: "py-2 px-3 text-gray-700 text-sm flex-1 flex flex-col gap-0.5",
  };

  const semesterToString = (semester: Lecture["semester"]) => {
    if (semester === "FIRST_SEMESTER") return "1학기";
    if (semester === "SECOND_SEMESTER") return "2학기";
    if (semester === "SUMMER") return "여름학기";
    if (semester === "WINTER") return "겨울학기";
    return semester;
  };

  // const lectureStatusToString = (status: Lecture["lectureStatus"]) => {
  //   if (status === "BEFORE") return "개설 예정";
  //   if (status === "IN_PROGRESS") return "진행중";
  //   if (status === "COMPLETED") return "종료";
  //   return status;
  // };

  const dayToKorean = (day: string) => {
    return (
      { MON: "월", TUE: "화", WED: "수", THU: "목", FRI: "금" }[day] || day
    );
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
          <div className={tableStyles.label}>담당 교수</div>
          <div className={tableStyles.value}>{data.professor.name} 교수</div>
        </div>
        <div className={tableStyles.row}>
          <div className={tableStyles.label}>개설 연도/학기</div>
          <div className={tableStyles.value}>
            {data.year}년 {semesterToString(data.semester)}
          </div>
        </div>
        {/* <div className={tableStyles.row}>
          <div className={tableStyles.label}>수강 제한 인원</div>
          <div className={tableStyles.value}>{data.sizeLimit}명</div>
        </div> */}
        <div className={tableStyles.row}>
          <div className={tableStyles.label}>강의실</div>
          <div className={tableStyles.value}>
            {data.lectureTimeAndLocation &&
              Object.keys(data.lectureTimeAndLocation).length > 0 ? (
              Object.entries(data.lectureTimeAndLocation).map(
                ([time, location]) => (
                  <span key={`loc-${time}`}>
                    {dayToKorean(time.split("_")[0])}요일: {location}호
                  </span>
                )
              )
            ) : (
              <span>미정</span>
            )}
          </div>
        </div>
        <div className={tableStyles.row}>
          <div className={tableStyles.label}>수업 시간</div>
          <div className={tableStyles.value}>
            {data.lectureTimeAndLocation &&
              Object.keys(data.lectureTimeAndLocation).length > 0 ? (
              Object.entries(data.lectureTimeAndLocation).map(([time, _]) => {
                const [day, period] = time.split("_");
                return (
                  <span key={`time-${time}`}>
                    {dayToKorean(day)}요일 {period}교시
                  </span>
                );
              })
            ) : (
              <span>미정</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureInfo;
