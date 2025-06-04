import { cn } from "fast-jsx/util";
import { useNavigate } from "react-router-dom";
import {
  MdChevronRight,
  MdAssignment,
  MdAnnouncement,
  MdDescription,
} from "react-icons/md";

// ** types
import { Lecture } from "@/types/Lecture";
// import { Announcement } from "@/types/Announcement";
// import { AssignmentClient } from "@/types/Assignment";
// import { Material } from "@/types/Material";

interface Props {
  data: Lecture;
  // assignments: AssignmentClient[];
  // announcements: Announcement[];
  // materials: Material[];
  // hasNewContent?: boolean;
  // recentUpdates?: Array<{
  //   type: "assignment" | "announcement" | "material";
  //   title: string;
  // }>;
  className?: string;
}

const LectureCard = ({
  data,
  // assignments,
  // announcements,
  // materials,
  // hasNewContent,
  // recentUpdates = [],
  className,
}: Props) => {
  const navigate = useNavigate();

  const container = {
    displays:
      "flex flex-col bg-white border border-gray-100 overflow-hidden cursor-pointer",
    transitions:
      "transition-all duration-200 hover:shadow-sm hover:border-kw-brown/20",
    rounded: "rounded-lg",
  };

  const body = {
    displays: "flex flex-col",
    paddings: "p-4",
  };

  const header = {
    displays: "flex flex-row justify-between items-center",
  };

  const title = {
    displays: "flex flex-row items-center gap-2",
  };

  const courseName = {
    texts: "text-base font-bold text-gray-900",
  };

  const courseCode = {
    texts: "text-sm text-gray-500",
  };

  const info = {
    displays: "flex flex-row gap-4",
    texts: "text-sm text-gray-500",
    margins: "mb-3",
    details: "text-xs text-gray-400",
  };

  const stats = {
    displays: "flex flex-row gap-3",
  };

  const stat = {
    displays: "flex flex-col items-center justify-center",
    backgrounds: "bg-gray-50",
    rounded: "rounded-lg",
    paddings: "px-3 py-2",
    sizes: "min-w-[4rem]",
  };

  const statValue = {
    texts: "text-base font-semibold text-gray-900",
  };

  const statLabel = {
    texts: "text-xs text-gray-500",
  };

  const arrow = {
    texts: "text-gray-400 group-hover:text-kw-brown",
    transitions: "transition-colors",
  };

  const updates = {
    displays: "mt-3 pt-3",
    borders: "border-t border-gray-100",
  };

  const updateItem = {
    displays: "flex items-center gap-1.5",
    texts: "text-xs text-gray-600",
  };

  const updateIcon = {
    sizes: "w-3.5 h-3.5",
    texts: "text-gray-400",
  };

  const newBadge = {
    displays: "inline-flex items-center",
    paddings: "px-1.5 py-0.5",
    backgrounds: "bg-red-100",
    texts: "text-red-600 text-xs font-medium",
    rounded: "rounded-full",
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <MdAssignment className={cn(updateIcon)} />;
      case "announcement":
        return <MdAnnouncement className={cn(updateIcon)} />;
      case "material":
        return <MdDescription className={cn(updateIcon)} />;
      default:
        return null;
    }
  };

  // 과제 제출 현황 계산 (임시 데이터)
  // const submittedAssignments = assignments.filter(
  //   (a) => a.dueDate > new Date()
  // ).length;

  const formatStatValue = (value: number, total?: number) => {
    if (value === 0 && (!total || total === 0)) return "-";
    return total ? `${value}/${total}` : value.toString();
  };

  return (
    <div
      className={cn(container, className)}
      onClick={() => navigate(`/dashboard/lectures/${data.lectureId}`)}
    >
      <div className={cn(body)}>
        <div className={cn(header)}>
          <div className={cn(title)}>
            <h3 className={cn(courseName)}>
              {data.courseResponseDto.courseName}
              {/* {hasNewContent && (
                <span className={cn(newBadge, "ml-2")}>NEW</span>
              )} */}
            </h3>
            <span className={cn(courseCode)}>
              ({data.courseResponseDto.courseNumber})
            </span>
          </div>
          <MdChevronRight className={cn(arrow, "w-5 h-5")} />
        </div>

        <div className={cn(info.displays, info.texts, info.margins)}>
          <p className="font-medium">{data.professor.name} 교수</p>
          <div>
            <p>
              {data.year}년{" "}
              {data.semester === "FIRST_SEMESTER"
                ? "1학기"
                : data.semester === "SECOND_SEMESTER"
                ? "2학기"
                : data.semester === "SUMMER"
                ? "여름학기"
                : "겨울학기"}
            </p>
            <p className={cn(info.details)}>수강 제한: {data.sizeLimit}명</p>
            {/* <p className={cn(info.details)}>
              강의 상태:{" "}
              {data.lectureStatus === "BEFORE"
                ? "개설 예정"
                : data.lectureStatus === "IN_PROGRESS"
                ? "진행중"
                : "종료"}
            </p> */}
          </div>
        </div>

        {data.lectureTimeAndLocation &&
        Object.keys(data.lectureTimeAndLocation).length > 0 ? (
          <div
            className={cn(info.displays, info.texts, "flex-wrap items-center")}
          >
            <p className="font-medium mr-2">시간/장소</p>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {Object.entries(data.lectureTimeAndLocation).map(
                ([time, location], index, arr) => {
                  const [day, period] = time.split("_");
                  const dayKorean =
                    { MON: "월", TUE: "화", WED: "수", THU: "목", FRI: "금" }[
                      day
                    ] || day;
                  return (
                    <span
                      key={time}
                      className={cn(info.details, "whitespace-nowrap")}
                    >
                      {dayKorean} {period}교시 ({location}호)
                      {index < arr.length - 1 ? "" : ""}
                    </span>
                  );
                }
              )}
            </div>
          </div>
        ) : (
          <p className={cn(info.texts, info.details, "mb-1")}>
            시간/장소: 미정
          </p>
        )}

        {/* <p className={cn(info.texts, info.details, "text-right mt-2")}>
          개설일: {new Date(data.createdAt).toLocaleDateString()}
        </p> */}

        {/* <div className={cn(stats)}>
          <div className={cn(stat)}>
            <span className={cn(statValue)}>
              {formatStatValue(submittedAssignments, assignments.length)}
            </span>
            <span className={cn(statLabel)}>과제</span>
          </div>
          <div className={cn(stat)}>
            <span className={cn(statValue)}>
              {formatStatValue(announcements.length)}
            </span>
            <span className={cn(statLabel)}>공지사항</span>
          </div>
          <div className={cn(stat)}>
            <span className={cn(statValue)}>
              {formatStatValue(materials.length)}
            </span>
            <span className={cn(statLabel)}>강의자료</span>
          </div>
        </div>

        {recentUpdates.length > 0 && (
          <div className={cn(updates)}>
            {recentUpdates.map((update, index) => (
              <div key={index} className={cn(updateItem)}>
                {getUpdateIcon(update.type)}
                <span className="line-clamp-1">{update.title}</span>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default LectureCard;
