import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// ** util
import { cn } from "fast-jsx/util";

// ** connection
import courseApi from "@/connection/api/course";

// ** components
import ComponentLoading from "@/design/ComponentLoading";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

// ** types
import { Course, CourseCreate } from "@/types/Course";

interface CourseListProps {
  courses: Course[];
}

export default function CourseList({ courses }: CourseListProps) {
  const queryClient = useQueryClient();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const enrollMutation = useMutation({
    mutationFn: (course: Course) =>
      courseApi.post({
        courseName: course.courseName,
        courseNumber: course.courseNumber,
        score: course.score,
      } as CourseCreate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courseGet"] });
      setSelectedCourse(null);
    },
  });

  const handleEnroll = (course: Course) => {
    if (window.confirm(`${course.courseName}을(를) 수강신청 하시겠습니까?`)) {
      // enrollMutation.mutate(course);
    }
  };

  const columnHelper = createColumnHelper<Course>();
  const columns = [
    columnHelper.accessor("courseName", {
      header: "과목명",
      cell: (props) => <p className="truncate max-w-xs">{props.getValue()}</p>,
      size: 200,
    }),
    columnHelper.accessor("courseNumber", {
      header: "과목번호",
      size: 120,
    }),
    columnHelper.accessor("score", {
      header: "학점",
      size: 80,
    }),
    columnHelper.accessor("id", {
      header: "작업",
      cell: (props) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEnroll(props.row.original);
          }}
          disabled={enrollMutation.isPending}
          className="text-blue-600 hover:text-blue-900 disabled:text-gray-400"
        >
          수강신청
        </button>
      ),
      size: 100,
    }),
  ];

  const table = useReactTable({
    data: courses,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableStyles = {
    base: "w-full relative",
    header: "border-b border-gray-100",
    cell: "px-[6px] py-[6px] text-left",
    cellFirst: "pl-[20px]",
    cellLast: "pr-[20px]",
    thItem: "text-sm text-gray-400 font-medium h-10 min-h-10 bg-[#FAFCFD]",
    tdItem: "text-sm text-gray-700 font-normal h-10 min-h-10",
  };

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
    <div className="relative">
      {enrollMutation.isPending && <ComponentLoading />}
      <div className={cn(cardStyles.base, cardStyles.rounded, "shadow-table")}>
        {/* Header */}
        <div className={cardStyles.header}>
          <div className={cardStyles.headerTitle}>
            <span>강의 목록</span>
            <span className="text-xs text-gray-500 font-medium">
              {courses.length}개
            </span>
          </div>
        </div>

        {/* Contents */}
        <div className="relative flex grow overflow-x-scroll border-b border-gray-100">
          <table className={cn(tableStyles.base)}>
            <thead className={cn(tableStyles.header)}>
              {table.getHeaderGroups().map((group) => (
                <tr key={group.id}>
                  {group.headers.map((header, index) => (
                    <th
                      key={header.id}
                      style={{
                        width: header.getSize(),
                        minWidth: header.getSize(),
                      }}
                      className={cn(
                        tableStyles.cell,
                        tableStyles.thItem,
                        index === 0 ? tableStyles.cellFirst : "",
                        index === group.headers.length - 1
                          ? tableStyles.cellLast
                          : ""
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {!table.getRowModel().rows.length ? (
                <tr style={{ height: "400px" }}>
                  <td
                    className={cn(
                      tableStyles.cell,
                      tableStyles.tdItem,
                      tableStyles.cellFirst,
                      tableStyles.cellLast,
                      "text-center"
                    )}
                    colSpan={4}
                  >
                    <div className="flex flex-col items-center justify-center gap-8 text-gray-300">
                      <span className="text-sm font-medium">
                        등록된 강의가 없습니다
                      </span>
                    </div>
                  </td>
                </tr>
              ) : undefined}

              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.original.id}
                  onClick={() => setSelectedCourse(row.original)}
                  className="hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-all"
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <td
                      key={cell.id}
                      className={cn(
                        tableStyles.cell,
                        tableStyles.tdItem,
                        index === 0 ? tableStyles.cellFirst : "",
                        index === row.getVisibleCells().length - 1
                          ? tableStyles.cellLast
                          : ""
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 상세 정보 모달 */}
      {/* {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{selectedCourse.courseName}</h3>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">과목번호</h4>
                <p className="mt-1">{selectedCourse.courseNumber}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">학점</h4>
                <p className="mt-1">{selectedCourse.score}</p>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => handleEnroll(selectedCourse)}
                  disabled={enrollMutation.isPending}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                >
                  {enrollMutation.isPending ? "신청 중..." : "수강 신청"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
