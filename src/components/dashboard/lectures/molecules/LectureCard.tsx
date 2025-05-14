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
import { Announcement } from "@/types/Announcement";
import { Assignment } from "@/types/Assignment";
import { Material } from "@/types/Material";

interface Props {
  data: Lecture;
  assignments: Assignment[];
  announcements: Announcement[];
  materials: Material[];
  hasNewContent?: boolean;
  recentUpdates?: Array<{
    type: "assignment" | "announcement" | "material";
    title: string;
  }>;
  className?: string;
}

const LectureCard = ({
  data,
  assignments,
  announcements,
  materials,
  hasNewContent,
  recentUpdates = [],
  className,
}: Props) => {
  const navigate = useNavigate();

  const cardStyles = {
    base: "flex flex-col bg-white border border-gray-100 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-kw-brown/20",
    shadow: "shadow-card",
    rounded: "rounded-xl",
    body: "flex flex-col p-4 md:p-6",
    header: "flex flex-row justify-between items-center mb-4",
    title: "text-lg font-bold text-gray-900 line-clamp-1",
    info: "flex flex-row gap-8 text-sm text-gray-600",
    stats: "flex flex-row gap-8 mt-4",
    stat: "flex flex-row items-center gap-2",
    statValue: "text-base font-semibold text-gray-900",
    statLabel: "text-sm text-gray-500",
    arrow: "text-gray-400 group-hover:text-kw-brown transition-colors",
    updates: "mt-4 pt-4 border-t border-gray-100",
    updateItem: "flex items-center gap-2 text-sm text-gray-600",
    updateIcon: "w-4 h-4 text-gray-400",
    newBadge: "ml-2 px-1.5 py-0.5 bg-red-100 text-red-600 text-xs rounded-md",
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <MdAssignment className={cardStyles.updateIcon} />;
      case "announcement":
        return <MdAnnouncement className={cardStyles.updateIcon} />;
      case "material":
        return <MdDescription className={cardStyles.updateIcon} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(cardStyles.base, cardStyles.rounded, className)}
      onClick={() => navigate(`/dashboard/lectures/${data.id}`)}
    >
      <div className={cn(cardStyles.body)}>
        <div className={cardStyles.header}>
          <h3 className={cardStyles.title}>
            {data.courseResponseDto.courseName}
            {hasNewContent && (
              <span className={cardStyles.newBadge}>새로 등록됨</span>
            )}
          </h3>
          <MdChevronRight className={cn(cardStyles.arrow, "w-6 h-6")} />
        </div>

        <div className={cardStyles.info}>
          <p>{data.professor.name} 교수</p>
          <p>
            {data.year.value}년 {data.semester === "FIRST_SEMESTER" ? "1" : "2"}
            학기
          </p>
          <p>
            {data.lectureScheduleAndLocation[0]?.room || "미정"} /{" "}
            {data.lectureScheduleAndLocation[0]?.periods?.join() || "미정"}
          </p>
        </div>

        <div className={cardStyles.stats}>
          <div className={cardStyles.stat}>
            <span className={cardStyles.statValue}>{assignments.length}</span>
            <span className={cardStyles.statLabel}>과제</span>
          </div>
          <div className={cardStyles.stat}>
            <span className={cardStyles.statValue}>{announcements.length}</span>
            <span className={cardStyles.statLabel}>공지사항</span>
          </div>
          <div className={cardStyles.stat}>
            <span className={cardStyles.statValue}>{materials.length}</span>
            <span className={cardStyles.statLabel}>강의자료</span>
          </div>
        </div>

        {recentUpdates.length > 0 && (
          <div className={cardStyles.updates}>
            {recentUpdates.map((update, index) => (
              <div key={index} className={cardStyles.updateItem}>
                {getUpdateIcon(update.type)}
                <span className="line-clamp-1">{update.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureCard;
