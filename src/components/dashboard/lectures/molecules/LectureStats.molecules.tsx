import { cn } from "fast-jsx/util";

// ** types
import { Announcement } from "@/types/Announcement";
import { AssignmentClient } from "@/types/Assignment";
import { Material } from "@/types/Material";

interface Props {
  assignments: AssignmentClient[];
  announcements: Announcement[];
  materials: Material[];
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
        <div className={tableStyles.row}>
          <div className={tableStyles.label}>과제</div>
          <div className={tableStyles.value}>
            <div className="flex items-center gap-2">
              <p className="font-medium">{assignments.length}개</p>
              <p className="text-gray-500 text-xs">
                (제출: 0/{assignments.length})
              </p>

              {assignments.some((a) => isNewItem(a.createdAt)) && <NewBadge />}
            </div>
          </div>
        </div>

        <div className={tableStyles.row}>
          <div className={tableStyles.label}>공지사항</div>
          <div className={tableStyles.value}>
            <div className="flex items-center gap-2">
              <p className="font-medium">{announcements.length}개</p>

              {announcements.some((a) => isNewItem(a.createdAt)) && (
                <NewBadge />
              )}
            </div>
          </div>
        </div>

        <div className={cn(tableStyles.row, "h-full")}>
          <div className={tableStyles.label}>강의자료</div>
          <div className={tableStyles.value}>
            <div className="flex items-center gap-2">
              <p className="font-medium">{materials.length}개</p>

              {materials.some((m) => isNewItem(m.createdAt)) && <NewBadge />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureStats;
