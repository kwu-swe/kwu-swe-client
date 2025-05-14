import { cn } from "fast-jsx/util";

// ** modules
import dayjs from "dayjs";

// ** components
import Pagination from "@/components/pagination/Pagination";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

// ** assets
import { MdAttachFile } from "react-icons/md";

// ** types
import { Material } from "@/types/Material";

interface Props {
  data: Material[];
  count: number;
  page: number;
  totalPages: number;
  onClick: (materialId: number) => void;
  onPageChange: (page: number) => void;
  className?: string;
}

const MaterialTable = ({
  data,
  count,
  page,
  totalPages,
  onClick,
  onPageChange,
  className,
}: Props) => {
  // 날짜 포맷 함수
  const formatDate = (date: string | Date, format: string = "YYYY-MM-DD") => {
    return date ? dayjs(date).format(format) : "(입력전)";
  };

  // [#] table render
  const columnHelper = createColumnHelper<Material>();
  const columns = [
    // columnHelper.accessor("id", {
    //   header: "번호",
    //   size: 60,
    // }),
    columnHelper.accessor("title", {
      header: "제목",
      size: 160,
    }),
    columnHelper.accessor(() => "file", {
      id: "file",
      header: "자료",
      cell: () => (
        <MdAttachFile size={16} className="text-gray-500 cursor-pointer" />
      ),
      size: 60,
    }),
    columnHelper.accessor("createdAt", {
      header: "등록일",
      cell: (props) => (
        <p className="text-sm text-gray-500">
          {formatDate(props.getValue(), "YYYY-MM-DD")}
        </p>
      ),
      size: 120,
    }),
  ];

  const table = useReactTable({
    data,
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
    footer:
      "flex flex-row justify-end items-center p-2.5 gap-3 md:gap-6 border-t border-gray-100",
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
      {/* Header */}
      <div className={cardStyles.header}>
        <div className={cardStyles.headerTitle}>
          <span>강의 자료</span>
          <span className="text-xs text-gray-500 font-medium">{count}개</span>
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
                  style={{ textAlign: "center" }}
                  colSpan={columns.length} // colSpan을 동적으로 설정
                >
                  <div className="flex flex-col items-center justify-center gap-8 text-gray-300">
                    <span className="text-sm font-medium">
                      강의 자료가 없습니다
                    </span>
                  </div>
                </td>
              </tr>
            ) : undefined}

            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.original.id}
                onClick={() => onClick(row.original.id)} // props로 전달된 onClick 호출
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page || 0}
        pageCount={totalPages}
        onClick={onPageChange}
      />
    </div>
  );
};

export default MaterialTable;
