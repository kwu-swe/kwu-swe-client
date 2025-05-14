import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// ** util
import { cn } from "fast-jsx/util";

// ** components
import ComponentLoading from "@/design/ComponentLoading";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

// ** types
import { Lecture } from "@/types/Lecture";
import useLecture from "@/hook/useLecture";
import useUser from "@/hook/useUser";

interface LectureListProps {
  lectures: Lecture[];
}

export default function LectureApplyList({ lectures }: LectureListProps) {
  const queryClient = useQueryClient();
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const { postAssistant } = useLecture();
  const { user } = useUser();

  const enrollMutation = useMutation({
    mutationFn: async (lecture: Lecture) => {
      if (!user) throw new Error("사용자 정보가 없습니다.");
      return postAssistant({
        lectureId: lecture.id,
        assistantNumber: parseInt(user.code),
        professorNumber: parseInt(lecture.professor.code),
      });
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
      enrollMutation.mutate(lecture);
    }
  };

  const columnHelper = createColumnHelper<Lecture>();
  const columns = [
    columnHelper.accessor("courseResponseDto.courseName", {
      header: "과목명",
      cell: (props) => <p className="truncate max-w-xs">{props.getValue()}</p>,
      size: 200,
    }),
    columnHelper.accessor("courseResponseDto.courseNumber", {
      header: "과목번호",
      size: 120,
    }),
    columnHelper.accessor("courseResponseDto.score", {
      header: "학점",
      size: 80,
    }),
    columnHelper.accessor("professor.name", {
      header: "교수명",
      size: 120,
    }),
    columnHelper.accessor("lectureScheduleAndLocation", {
      header: "강의시간",
      cell: (props) => {
        const schedules = props.getValue();
        return (
          <div className="flex flex-col gap-1">
            {schedules.map((schedule, index) => (
              <span key={index} className="text-xs">
                {schedule.day} {schedule.periods.join(",")}교시 ({schedule.room}
                호)
              </span>
            ))}
          </div>
        );
      },
      size: 200,
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
                    colSpan={6}
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
    </div>
  );
}
