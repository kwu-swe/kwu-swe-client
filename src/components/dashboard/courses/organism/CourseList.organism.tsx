import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// ** util
import { cn } from "fast-jsx/util";

// ** hooks
import useLecture from "@/hook/useLecture";

// ** components
import ComponentLoading from "@/design/ComponentLoading";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

// ** types
import { Lecture } from "@/types/Lecture"; // LectureTime 추가 (가정)

interface CourseListProps {
  lectures: Lecture[];
}

export default function CourseList({ lectures }: CourseListProps) {
  const queryClient = useQueryClient();
  const { postStudentLecture } = useLecture();
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);

  const enrollMutation = useMutation<unknown, Error, number>({
    mutationFn: async (lectureId: number) => {
      return await postStudentLecture(lectureId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectureGet"] });
      setSelectedLecture(null);
    },
  });

  const handleEnroll = (lecture: Lecture) => {
    if (
      window.confirm(
        `${lecture.courseResponseDto.courseName}을(를) 수강신청 하시겠습니까?`
      )
    ) {
      enrollMutation.mutate(lecture.lectureId);
    }
  };

  const columnHelper = createColumnHelper<Lecture>();
  const columns = [
    columnHelper.accessor((row) => row.courseResponseDto.courseName, {
      id: "courseName",
      header: "과목명",
      cell: (props) => <p className="truncate max-w-xs">{props.getValue()}</p>,
      size: 140,
    }),
    columnHelper.accessor((row) => row.courseResponseDto.courseNumber, {
      id: "courseNumber",
      header: "과목번호",
      size: 140,
    }),
    columnHelper.accessor((row) => row.courseResponseDto.score, {
      id: "score",
      header: "학점",
      size: 60,
      cell: (props) => <p>{props.getValue()}학점</p>,
    }),
    columnHelper.accessor("professor.name", {
      header: "교수명",
      size: 80,
    }),
    columnHelper.accessor(
      (row) => ({
        year: row.year,
        semester: row.semester,
      }),
      {
        id: "lectureScheduleAndLocation",
        header: "강의 학기",
        cell: (props) => {
          const { year, semester } = props.getValue();
          // LectureTime 타입이 실제 프로젝트에 맞게 정의되어 있다고 가정합니다.
          // 예: interface LectureTime { dayOfWeek: string; startPeriod: number; endPeriod: number; }
          if (!year || !semester) return <span>-</span>;
          return (
            <div className="flex flex-col gap-1">
              {year}년 {semester === "FIRST_SEMESTER" ? "1" : "2"}학기
            </div>
          );
        },
        size: 150,
      }
    ),
    columnHelper.accessor("lectureId", {
      header: "액션",
      cell: (props) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log("props.row.original", props.row.original);
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
    data: lectures,
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
              {lectures.length}개
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
                    colSpan={columns.length} // 컬럼 수에 맞게 동적으로 설정
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
                  key={row.original.lectureId} // Lecture의 id를 key로 사용
                  onClick={() => setSelectedLecture(row.original)}
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
      {selectedLecture && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">
                {selectedLecture.courseResponseDto.courseName}
              </h3>
              <button
                onClick={() => setSelectedLecture(null)}
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
                <p className="mt-1">
                  {selectedLecture.courseResponseDto.courseNumber}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">학점</h4>
                <p className="mt-1">
                  {selectedLecture.courseResponseDto.score}학점
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">교수명</h4>
                <p className="mt-1">{selectedLecture.professor.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  강의시간/장소
                </h4>
                {/* <div className="mt-1 flex flex-col gap-1">
                  {selectedLecture.lectureTimeRequests.map(
                    (time: LectureTime, index: number) => {
                      const periods = Array.from(
                        { length: time.endPeriod - time.startPeriod + 1 },
                        (_, i) => time.startPeriod + i
                      );
                      return (
                        <span key={index} className="text-xs">
                          {time.dayOfWeek} {periods.join(",")}교시 (
                          {selectedLecture.lectureRoom})
                        </span>
                      );
                    }
                  )}
                </div> */}
              </div>
              <div className="pt-4">
                <button
                  onClick={() => handleEnroll(selectedLecture)}
                  disabled={enrollMutation.isPending}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                >
                  {enrollMutation.isPending ? "신청 중..." : "수강 신청"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
