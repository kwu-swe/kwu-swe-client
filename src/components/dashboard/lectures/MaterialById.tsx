import { cn } from "fast-jsx/util";
import { useNavigate } from "react-router-dom";

// ** hook
import useMaterial from "@/hook/useMaterial";

// ** assets
import { MdArrowBack, MdAttachFile } from "react-icons/md";

export default function LectureMaterialById({
  lectureId,
  materialId,
}: {
  lectureId?: number;
  materialId?: number;
}) {
  const navigate = useNavigate();
  const { material } = useMaterial({ materialId: materialId });

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
    label: "py-3 px-4 text-gray-500 text-xs font-medium w-[120px] bg-gray-100",
    value: "py-3 px-4 text-gray-700 text-sm flex-1",
  };

  return (
    <div>
      <button
        onClick={() => navigate(`/dashboard/lectures/${lectureId}`)}
        className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-4"
      >
        <MdArrowBack className="w-5 h-5" />
        <span className="text-sm">돌아가기</span>
      </button>

      <div className={cn(cardStyles.base, cardStyles.rounded, "shadow-table")}>
        <div className={cardStyles.header}>
          <div className={cardStyles.headerTitle}>
            <span>강의 자료</span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className={tableStyles.row}>
            <div className={tableStyles.label}>제목</div>
            <div className={tableStyles.value}>{material?.title}</div>
          </div>
          {/* <div className={tableStyles.row}>
            <div className={tableStyles.label}>작성일</div>
            <div className={tableStyles.value}>
              {material?.createdAt?.toLocaleDateString()}
            </div>
          </div> */}
          <div className={tableStyles.row}>
            <div className={cn(tableStyles.label, "align-top")}>내용</div>
            <div className={tableStyles.value}>
              <div className="whitespace-pre-wrap">{material?.content}</div>
            </div>
          </div>
          <div className={tableStyles.row}>
            <div className={cn(tableStyles.label, "align-top")}>첨부파일</div>
            <div className={tableStyles.value}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer">
                  <MdAttachFile className="text-gray-500" size={16} />
                  <span>강의자료.pdf</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
