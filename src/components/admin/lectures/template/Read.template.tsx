import { Action, Shelf } from "fast-jsx";
import { cn } from "fast-jsx/util";
import NoData from "@/design/NoData";
import { Lecture } from "@/types/Lecture";

const formatLectureTime = (key: string) => {
  const [day, period] = key.split("_");
  const dayMap: Record<string, string> = {
    MON: "월",
    TUE: "화",
    WED: "수",
    THU: "목",
    FRI: "금",
  };
  return `${dayMap[day]}요일 ${period}교시`;
};

export default function ReadTemplate({
  lectures,
  isLoading,
}: {
  lectures: Lecture[];
  isLoading: boolean;
}) {
  if (isLoading) return <div>로딩 중...</div>;

  const cardStyles = {
    base: "flex flex-col bg-white border border-gray-100 overflow-hidden",
    rounded: "rounded-xl",
    shadow: "shadow-card",
    body: "flex flex-col p-4 md:p-8",
    header:
      "flex flex-row justify-between items-center p-4 border-b border-gray-100",
    title: "text-lg font-semibold text-gray-900",
  };

  const tableStyles = {
    container: "mt-4 border border-gray-200 rounded-lg overflow-hidden",
    row: "flex items-center px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors",
    col: "flex-1 px-2",
    label: "text-sm font-medium text-gray-900",
    value: "text-sm text-gray-600",
  };

  return (
    <div className={cn(cardStyles.base, cardStyles.rounded, cardStyles.shadow)}>
      <div className={cardStyles.header}>
        <h2 className={cardStyles.title}>강의 목록</h2>
      </div>
      <div className={cardStyles.body}>
        <Action.Replace
          actions={[[!lectures?.length, <NoData key="noData" />]]}
        >
          <div className={tableStyles.container}>
            {lectures?.map((lecture: Lecture) => (
              <div key={lecture.lectureId} className={tableStyles.row}>
                <div className={cn(tableStyles.col, "flex-[2]")}>
                  <h3 className={tableStyles.label}>
                    {lecture.courseResponseDto.courseName}
                  </h3>
                  <p className={tableStyles.value}>
                    {lecture.courseResponseDto.courseNumber}
                  </p>
                </div>
                <div className={tableStyles.col}>
                  <p className={tableStyles.label}>교수</p>
                  <p className={tableStyles.value}>{lecture.professor.name}</p>
                </div>
                <div className={tableStyles.col}>
                  <p className={tableStyles.label}>학기/년도</p>
                  <p className={tableStyles.value}>
                    {lecture.semester} {lecture.year}
                  </p>
                </div>
                <div className={tableStyles.col}>
                  <p className={tableStyles.label}>정원</p>
                  <p className={tableStyles.value}>{lecture.sizeLimit}명</p>
                </div>
                <div className={cn(tableStyles.col, "flex-[2]")}>
                  <p className={tableStyles.label}>강의시간</p>
                  <p className={tableStyles.value}>
                    {lecture.lectureTimeAndLocation &&
                    Object.keys(lecture.lectureTimeAndLocation).length > 0 ? (
                      Object.entries(lecture.lectureTimeAndLocation).map(
                        ([time, location], index, arr) => (
                          <span key={time}>
                            {formatLectureTime(time)} ({location}호)
                            {index < arr.length - 1 ? ", " : ""}
                          </span>
                        )
                      )
                    ) : (
                      <span>미정</span>
                    )}
                  </p>
                </div>
                <div className={tableStyles.col}>
                  <p className={tableStyles.label}>상태</p>
                  <p className={tableStyles.value}>{lecture.lectureStatus}</p>
                </div>
              </div>
            ))}
          </div>
        </Action.Replace>
      </div>
    </div>
  );
}
