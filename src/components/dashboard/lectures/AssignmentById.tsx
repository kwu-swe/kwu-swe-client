import { useState } from "react";

// ** modules
import { cn } from "fast-jsx/util";
import { useNavigate } from "react-router-dom";

// ** organism

// ** molecules

// ** assets
import { MdArrowBack, MdAttachFile } from "react-icons/md";

// ** typest
import {
  AssignmentClient,
  AssignmentSubmission,
  AssignmentFile,
} from "@/types/Assignment";

export default function LectureAssignmentById({
  lectureId,
  assignmentId,
}: {
  lectureId?: string;
  assignmentId?: string;
}) {
  const navigate = useNavigate();

  // 과제 상세 정보 상태
  const [assignment, setAssignment] = useState<AssignmentClient>({
    id: 1,
    lectureId: Number(lectureId) || 1,
    title: "프로그래밍 과제 1",
    content: "자바스크립트를 이용한 웹 애플리케이션 개발",
    dueDate: new Date("2023-12-31"),
    extendedDueDate: new Date("2024-01-07"),
    allowResubmission: true,
    isPublic: true,
    createdAt: new Date("2023-12-01"),
  });

  // 과제 제출 상태
  const [submission, setSubmission] = useState<AssignmentSubmission>({
    id: 1,
    assignmentId: Number(assignmentId) || 1,
    studentId: 1,
    status: "SUBMITTED",
    submittedAt: new Date(),
  });

  // 첨부 파일 상태
  const [files, setFiles] = useState<AssignmentFile[]>([]);

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 과제 정보 섹션 */}
        <div
          className={cn(
            cardStyles.base,
            cardStyles.rounded,
            "shadow-table",
            "col-span-2"
          )}
        >
          <div className={cardStyles.header}>
            <div className={cardStyles.headerTitle}>
              <span>과제 정보</span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className={tableStyles.row}>
              <div className={tableStyles.label}>제목</div>
              <div className={tableStyles.value}>{assignment.title}</div>
            </div>
            <div className={tableStyles.row}>
              <div className={tableStyles.label}>내용</div>
              <div className={tableStyles.value}>{assignment.content}</div>
            </div>
            <div className={tableStyles.row}>
              <div className={tableStyles.label}>제출 기한</div>
              <div className={tableStyles.value}>
                {assignment.dueDate.toLocaleDateString()}
              </div>
            </div>
            {assignment.extendedDueDate && (
              <div className={tableStyles.row}>
                <div className={tableStyles.label}>연장 기한</div>
                <div className={tableStyles.value}>
                  {assignment.extendedDueDate.toLocaleDateString()}
                </div>
              </div>
            )}
            <div className={tableStyles.row}>
              <div className={tableStyles.label}>재제출</div>
              <div className={tableStyles.value}>
                {assignment.allowResubmission ? "허용" : "불가"}
              </div>
            </div>
            <div className={tableStyles.row}>
              <div className={cn(tableStyles.label, "align-top")}>첨부파일</div>
              <div className={tableStyles.value}>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer">
                    <MdAttachFile className="text-gray-500" size={16} />
                    <span>과제설명서.pdf</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer">
                    <MdAttachFile className="text-gray-500" size={16} />
                    <span>참고자료.zip</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 과제 제출 섹션 */}
        <div
          className={cn(cardStyles.base, cardStyles.rounded, "shadow-table")}
        >
          <div className={cardStyles.header}>
            <div className={cardStyles.headerTitle}>
              <span>과제 제출</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-5">
            <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
              <p className="text-gray-500 text-sm">
                파일을 드래그하거나 클릭하여 업로드하세요
              </p>
            </div>
            <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 text-sm">
              제출하기
            </button>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <p className="text-gray-500 text-xs w-[80px]">제출 상태</p>
                <p className="text-gray-700 text-sm font-medium">
                  {submission.status === "SUBMITTED" ? "제출완료" : "지각제출"}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-gray-500 text-xs w-[80px]">제출 시간</p>
                <p className="text-gray-700 text-sm font-medium">
                  {submission.submittedAt.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
