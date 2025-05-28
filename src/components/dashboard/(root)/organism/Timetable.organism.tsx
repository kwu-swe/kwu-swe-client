import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// ** Fast-jsx
import { cn } from "fast-jsx/util";

// ** Components
import TitleBox from "@/design/Titles";

// ** Types
import { Lecture } from "@/types/Lecture";

interface TimeTableProps {
  lectures?: Lecture[];
}

// 시간표 설정
const DAYS = ["월", "화", "수", "목", "금", "토"];
const DAY_MAP: { [key: string]: number } = {
  MON: 0,
  TUE: 1,
  WED: 2,
  THU: 3,
  FRI: 4,
  SAT: 5,
};
const PERIODS = Array.from({ length: 9 }, (_, i) => i + 1);
const MAX_PERIODS = PERIODS.length;
const MAX_DAYS = DAYS.length;

// 랜덤 컬러 팔레트
const COLOR_PALETTE = [
  "bg-violet-500",
  "bg-teal-500",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-blue-500",
  "bg-pink-500",
];

// ID 기반 랜덤 컬러 생성 함수
function getRandomColor(id: number): string {
  return COLOR_PALETTE[id % COLOR_PALETTE.length];
}

/**
 * 강의 시간 정보를 파싱하여 요일 및 교시 인덱스 배열로 변환합니다.
 */
function parseLectureTime(
  timeAndLocation: Lecture["lectureTimeAndLocation"]
): Array<{ dayIndex: number; periodIndex: number; room: string }> {
  if (!timeAndLocation) return [];
  const result: Array<{ dayIndex: number; periodIndex: number; room: string }> = [];

  Object.entries(timeAndLocation).forEach(([key, value]) => {
    const [day, period] = key.split('_');
    const dayIndex = DAY_MAP[day];
    if (dayIndex === undefined || dayIndex >= MAX_DAYS) return;

    const periodIndex = parseInt(period) - 1;
    if (periodIndex >= 0 && periodIndex < MAX_PERIODS) {
      result.push({ dayIndex, periodIndex, room: value.toString() });
    }
  });
  return result;
}

export default function TimeTable({ lectures }: TimeTableProps) {
  const navigate = useNavigate();
  const containerClasses = {
    displays: "flex flex-col gap-y-3.5 py-0 md:py-8",
    sizes: "w-full",
  };

  const [scheduleTable, setScheduleTable] = useState<
    ((Lecture & { room: string; color: string }) | null)[][]
  >(() =>
    Array.from({ length: MAX_PERIODS }, () => Array(MAX_DAYS).fill(null))
  );

  const [hasSaturdaySchedule, setHasSaturdaySchedule] = useState(false);

  useEffect(() => {
    const newTable = Array.from(
      { length: MAX_PERIODS },
      () =>
        Array(MAX_DAYS).fill(null) as (
          | (Lecture & { room: string; color: string })
          | null
        )[]
    );

    let hasSaturday = false;

    if (lectures) {
      lectures.forEach((lecture) => {
        const parsedTimes = parseLectureTime(
          lecture.lectureTimeAndLocation
        );
        const lectureColor = getRandomColor(lecture.id);
        parsedTimes.forEach(({ dayIndex, periodIndex, room }) => {
          if (periodIndex < MAX_PERIODS && dayIndex < MAX_DAYS) {
            newTable[periodIndex][dayIndex] = {
              ...lecture,
              room,
              color: lectureColor,
            };
            if (dayIndex === 5) {
              // 토요일 인덱스
              hasSaturday = true;
            }
          }
        });
      });
    }
    setScheduleTable(newTable);
    setHasSaturdaySchedule(hasSaturday);
  }, [lectures]);

  // 토요일이 있는 경우에만 토요일을 포함한 요일 배열 생성
  const displayDays = useMemo(() => {
    return hasSaturdaySchedule ? DAYS : DAYS.slice(0, -1);
  }, [hasSaturdaySchedule]);

  const timetableContainerClasses = {
    sizes: "w-full",
    overflows: "overflow-auto",
    boundaries: "rounded-xl",
    shadows: "shadow-card",
  };

  const tableWrapperClasses = {
    sizes: "w-full min-w-[300px]",
    overflows: "overflow-x-auto",
  };

  const tableClasses = {
    sizes: "w-full",
    displays: "border-collapse table-fixed",
    backgrounds: "bg-white", // 테이블 기본 배경 추가
  };

  const tableCellBaseClasses =
    "border border-gray-100 p-1 sm:p-2 text-[10px] sm:text-xs md:text-sm";
  const thClasses = cn(
    tableCellBaseClasses,
    "bg-gray-100 font-semibold text-gray-700 text-center"
  );
  const periodCellClasses = cn(
    tableCellBaseClasses,
    "bg-white font-medium text-gray-600 text-center w-8 sm:w-10"
  );

  // 열 너비 계산
  const getColumnWidth = (index: number) => {
    if (index === 0) return "w-10 sm:w-12 md:w-16"; // 시간 열
    return "w-[calc((100%-3.5rem)/6)]"; // 나머지 열 (시간 열 너비를 제외한 공간을 6등분)
  };

  const handleLectureClick = (lectureId: number) => {
    navigate(`/dashboard/lectures/${lectureId}`);
  };

  return (
    <div className={cn(containerClasses)}>
      {/* <TitleBox title="시간표" /> */}
      <div className={cn(timetableContainerClasses)}>
        <div className={cn(tableWrapperClasses)}>
          <table className={cn(tableClasses)}>
            <thead>
              <tr>
                <th className={cn(thClasses, getColumnWidth(0))}>시간</th>
                {displayDays.map((day, index) => (
                  <th
                    key={day}
                    className={cn(thClasses, getColumnWidth(index + 1))}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERIODS.map((period, periodIndex) => (
                <tr key={period} className="h-12 sm:h-16">
                  <td className={periodCellClasses}>{`${period}교시`}</td>
                  {displayDays.map((_, dayIndex) => {
                    const lecture = scheduleTable[periodIndex][dayIndex];

                    if (!lecture) {
                      return (
                        <td
                          key={`${periodIndex}-${dayIndex}`}
                          className={cn(
                            tableCellBaseClasses,
                            getColumnWidth(dayIndex + 1)
                          )}
                        ></td>
                      );
                    }

                    const isStartOfLectureBlock =
                      periodIndex === 0 ||
                      scheduleTable[periodIndex - 1][dayIndex]?.id !==
                      lecture.id;

                    if (isStartOfLectureBlock) {
                      let rowSpan = 1;
                      for (let i = periodIndex + 1; i < MAX_PERIODS; i++) {
                        if (scheduleTable[i][dayIndex]?.id === lecture.id) {
                          rowSpan++;
                        } else {
                          break;
                        }
                      }

                      return (
                        <td
                          key={`${periodIndex}-${dayIndex}`}
                          rowSpan={rowSpan}
                          onClick={() => handleLectureClick(lecture.id)}
                          className={cn(
                            tableCellBaseClasses,
                            lecture.color,
                            getColumnWidth(dayIndex + 1),
                            "align-top relative p-1 sm:p-1.5",
                            "cursor-pointer transition-all duration-150 ease-in-out",
                            "hover:shadow-lg hover:brightness-110",
                            "active:brightness-90"
                          )}
                        >
                          <div
                            className={cn(
                              "font-bold text-[10px] sm:text-xs md:text-sm",
                              "text-white"
                            )}
                          >
                            {lecture.courseResponseDto.courseName}
                          </div>
                          {lecture.professor && (
                            <div className="text-[8px] sm:text-[10px] md:text-xs text-gray-100">
                              {lecture.professor.name}
                            </div>
                          )}
                          {lecture.room && (
                            <div className="text-[7px] sm:text-[9px] md:text-[10px] mt-0.5 text-gray-200">
                              {lecture.room}
                            </div>
                          )}
                        </td>
                      );
                    }
                    return null;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
