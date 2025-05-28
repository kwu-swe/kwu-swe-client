import { Action } from "fast-jsx";
import NoData from "@/design/NoData";
import { Course } from "@/types/Course";
import { cn } from "fast-jsx/util";

export default function ReadTemplate({
  courses,
  isLoading,
}: {
  courses: Course[];
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
    container:
      "mt-4 border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200",
    row: "flex items-center px-4 py-3 hover:bg-gray-50 transition-colors",
    col: "flex-1 px-2",
    label: "text-sm font-medium text-gray-900",
    value: "text-sm text-gray-600",
    badge: "px-2.5 py-0.5 rounded-full text-xs font-medium",
    majorBadge: "bg-blue-100 text-blue-800",
    creditBadge: "bg-green-100 text-green-800",
  };

  return (
    <div className={cn(cardStyles.base, cardStyles.rounded, cardStyles.shadow)}>
      <div className={cardStyles.header}>
        <h2 className={cardStyles.title}>과목 목록</h2>
      </div>
      <div className={cardStyles.body}>
        <Action.Replace actions={[[!courses?.length, <NoData key="noData" />]]}>
          <div className={tableStyles.container}>
            {courses?.map((course: Course) => (
              <div key={course.courseId} className={tableStyles.row}>
                <div className={cn(tableStyles.col, "flex-[2]")}>
                  <h3 className={tableStyles.label}>{course.courseName}</h3>
                  <p className={tableStyles.value}>{course.courseNumber}</p>
                </div>
                <div className={tableStyles.col}>
                  <span
                    className={cn(tableStyles.badge, tableStyles.creditBadge)}
                  >
                    {course.score}학점
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Action.Replace>
      </div>
    </div>
  );
}
