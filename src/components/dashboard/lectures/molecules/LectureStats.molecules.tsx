import { cn } from "fast-jsx/util";

// ** types
import { Announcement, AnnouncementList } from "@/types/Announcement";
import { AssignmentByLecture } from "@/types/Assignment";
import { Material } from "@/types/Material";

// Grade 타입 정의 (String Literal Union)
export type Grade =
  | "A+"
  | "A0"
  | "A-"
  | "B+"
  | "B0"
  | "B-"
  | "C+"
  | "C0"
  | "C-"
  | "D+"
  | "D0"
  | "D-"
  | "F"
  | "P"
  | "NP"
  | null;

interface Props {
  assignments: AssignmentByLecture[];
  announcements: AnnouncementList[];
  materials: Material[];
  grade?: Grade; // grade prop 추가 (optional로 우선 설정)
  className?: string;
}

const NewBadge = () => (
  <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] rounded-md">
    새로 등록됨
  </span>
);

const LectureStats = ({
  assignments,
  announcements,
  materials,
  grade = null,
  className,
}: Props) => {
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
    gradeValue: "py-1 px-3 text-sm font-semibold flex-1", // 학점용 스타일 추가
  };

  // 학점별 스타일 (예시)
  const gradeStyles: Record<string, string> = {
    "A+": "text-green-600",
    A0: "text-green-500",
    "A-": "text-green-400",
    "B+": "text-blue-600",
    B0: "text-blue-500",
    "B-": "text-blue-400",
    "C+": "text-yellow-600",
    C0: "text-yellow-500",
    "C-": "text-yellow-400",
    "D+": "text-orange-600",
    D0: "text-orange-500",
    "D-": "text-orange-400",
    F: "text-red-600",
    P: "text-purple-500",
    NP: "text-gray-500",
  };

  // 최근 3일 이내 생성된 항목인지 확인하는 함수
  const isNewItem = (createdAt: Date) => {
    return (
      new Date().getTime() - new Date(createdAt).getTime() <
      3 * 24 * 60 * 60 * 1000
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
          <span>강의 현황</span>
        </div>
      </div>

      <div className="flex flex-col h-full">
        {/* 취득 학점 행 추가 */}
        <div className={tableStyles.row}>
          <div className={tableStyles.label}>취득 학점</div>
          <div
            className={cn(
              tableStyles.gradeValue,
              grade && gradeStyles[grade] ? gradeStyles[grade] : "text-gray-700"
            )}
          >
            {grade !== null ? grade : "-"}
          </div>
        </div>

        <div className={tableStyles.row}>
          <div className={tableStyles.label}>과제</div>
          <div className={tableStyles.value}>
            <div className="flex items-center gap-2">
              <p className="font-medium">{assignments.length || 0}개</p>
              {!!assignments?.length && (
                <p className="text-gray-500 text-xs">
                  (제출: 0/{assignments.length})
                </p>
              )}

              {/* {assignments.some((a) => isNewItem(a?.createdAt)) && (
                <NewBadge />
              )} */}
            </div>
          </div>
        </div>

        <div className={tableStyles.row}>
          <div className={tableStyles.label}>공지사항</div>
          <div className={tableStyles.value}>
            <div className="flex items-center gap-2">
              <p className="font-medium">{announcements.length}개</p>

              {/* {announcements.some((a) => isNewItem(a.createdAt)) && (
                <NewBadge />
              )} */}
            </div>
          </div>
        </div>

        <div className={cn(tableStyles.row, "h-full")}>
          <div className={tableStyles.label}>강의자료</div>
          <div className={tableStyles.value}>
            <div className="flex items-center gap-2">
              <p className="font-medium">{materials.length}개</p>

              {materials.some((m) => isNewItem(m.createdAt!)) && <NewBadge />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureStats;
