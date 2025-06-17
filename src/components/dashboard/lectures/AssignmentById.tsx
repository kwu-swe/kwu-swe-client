import { useState, useRef, ChangeEvent, useEffect } from "react";

// ** modules
import { cn } from "fast-jsx/util";
import { useNavigate } from "react-router-dom";
import { Button } from "fast-jsx";

// ** hook
import useAssignment from "@/hook/useAssignment";
import { useSubmission } from "@/hook/useAssignment";

// ** api
import imageApi from "@/service/api/image";

// ** assets
import { MdArrowBack, MdAttachFile, MdClose } from "react-icons/md";

// ** types
import { SubmissionCreate } from "@/types/Assignment";

export default function LectureAssignmentById({
  lectureId,
  assignmentId,
}: {
  lectureId?: string;
  assignmentId?: string;
}) {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [submissionContent, setSubmissionContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [existingFiles, setExistingFiles] = useState<string[]>([]);

  const { assignment } = useAssignment({
    assignmentId: Number(assignmentId),
  });

  const { submission, postSubmission, updateSubmission, deleteSubmission } =
    useSubmission({
      assignmentId: Number(assignmentId),
    });

  // 마감일 체크
  const isOverdue = assignment?.dueDate
    ? new Date(
        assignment.dueDate instanceof Date
          ? assignment.dueDate
          : new Date(assignment.dueDate)
      ) < new Date()
    : false;

  // 마감일 포맷팅 함수 (KST 기준)
  const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate);
    const now = new Date();

    // KST 기준으로 날짜 비교
    const kstOffset = 9 * 60; // KST는 UTC+9
    const kstDate = new Date(date.getTime() + kstOffset * 60 * 1000);
    const kstNow = new Date(now.getTime() + kstOffset * 60 * 1000);

    const isToday = kstDate.toDateString() === kstNow.toDateString();
    const isTomorrow =
      new Date(kstNow.getTime() + 24 * 60 * 60 * 1000).toDateString() ===
      kstDate.toDateString();

    // 상세 시간 포맷 (시:분:초 KST)
    const detailTimeString = date.toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    // 간단 시간 포맷 (시:분)
    const simpleTimeString = date.toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const dateString = date.toLocaleDateString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });

    return {
      simple: isToday
        ? `오늘 ${simpleTimeString}`
        : isTomorrow
        ? `내일 ${simpleTimeString}`
        : `${dateString} ${simpleTimeString}`,
      detailed: `${dateString} ${detailTimeString} (KST)`,
      isUrgent: isToday || isTomorrow,
    };
  };

  // 수정 모드 시작 시 기존 내용과 파일 불러오기
  useEffect(() => {
    if (isEditing && submission) {
      setSubmissionContent(submission.content);
      setExistingFiles(submission.encodedFiles);
    }
  }, [isEditing, submission]);

  // submission이 업데이트되면 편집 모드 종료 및 폼 초기화
  useEffect(() => {
    if (submission && !isEditing) {
      setSelectedFiles([]);
      setSubmissionContent("");
      setExistingFiles([]);
    }
  }, [submission, isEditing]);

  // submission이 삭제되면 편집 모드 종료 및 폼 초기화
  useEffect(() => {
    if (!submission) {
      setIsEditing(false);
      setSelectedFiles([]);
      setSubmissionContent("");
      setExistingFiles([]);
    }
  }, [submission]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingFile = (index: number) => {
    setExistingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (isOverdue) {
      alert("마감일이 지나 과제를 제출할 수 없습니다.");
      return;
    }

    if (
      !submissionContent.trim() &&
      selectedFiles.length === 0 &&
      existingFiles.length === 0
    ) {
      alert("내용을 입력하거나 파일을 첨부해주세요.");
      return;
    }

    try {
      const fileUrls = await Promise.all(
        selectedFiles.map(async (file) => {
          const url = await imageApi.put(file);
          if (!url) throw new Error("파일 업로드 실패");
          return url;
        })
      );

      const submissionData: SubmissionCreate = {
        title: "과제 제출",
        content: submissionContent,
        encodedFiles: [...existingFiles, ...fileUrls],
      };

      if (isEditing && submission) {
        updateSubmission({
          submissionId: submission.submissionId,
          submission: submissionData,
        });
      } else {
        postSubmission({
          assignmentId: Number(assignmentId),
          submission: submissionData,
        });
      }
    } catch (error) {
      console.error("파일 업로드 실패:", error);
      alert("파일 업로드에 실패했습니다.");
    }
  };

  const handleDelete = () => {
    if (!submission || !window.confirm("정말로 과제를 삭제하시겠습니까?"))
      return;

    deleteSubmission({
      submissionId: submission.submissionId,
    });
  };

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

  const buttonStyles = {
    base: {
      height: "h-10",
      font: "text-sm font-medium",
      background: "bg-gray-800 hover:bg-gray-700",
      textColor: "text-white",
    },
    red: {
      height: "h-10",
      font: "text-sm font-medium",
      background: "bg-red-50 hover:bg-red-100",
      textColor: "text-red-600",
    },
    gray: {
      height: "h-10",
      font: "text-sm font-medium",
      background: "bg-gray-100 hover:bg-gray-200",
      textColor: "text-gray-700",
    },
  };

  return (
    <div className="space-y-6">
      <div
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
        onClick={() => navigate(`/dashboard/lectures/${lectureId}`)}
      >
        <MdArrowBack className="w-5 h-5" />
        <span>강의로 돌아가기</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 과제 정보 섹션 */}
        <div className={cn(cardStyles.base, cardStyles.rounded, "shadow-sm")}>
          <div className={cardStyles.header}>
            <div className={cardStyles.headerTitle}>과제 정보</div>
          </div>
          <div className="flex flex-col flex-grow">
            <div className={tableStyles.row}>
              <div className={tableStyles.label}>제목</div>
              <div className={tableStyles.value}>{assignment?.title}</div>
            </div>
            <div className={cn(tableStyles.row, "flex-grow")}>
              <div className={cn(tableStyles.label, "align-top")}>내용</div>
              <div className={cn(tableStyles.value, "whitespace-pre-wrap")}>
                {assignment?.content}
              </div>
            </div>
            <div className={tableStyles.row}>
              <div className={tableStyles.label}>제출 기한</div>
              <div className={tableStyles.value}>
                {assignment?.dueDate ? (
                  <div className="flex flex-col gap-1">
                    {(() => {
                      const dueDateString =
                        assignment.dueDate instanceof Date
                          ? assignment.dueDate.toISOString()
                          : assignment.dueDate;
                      const dueDateInfo = formatDueDate(dueDateString);
                      return (
                        <>
                          <span
                            className={cn(
                              "text-sm font-medium",
                              isOverdue ? "text-red-600" : "text-gray-800"
                            )}
                          >
                            {dueDateInfo.simple}
                          </span>
                          <span className="text-xs text-gray-500">
                            {dueDateInfo.detailed}
                          </span>
                        </>
                      );
                    })()}
                    {isOverdue && (
                      <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-md inline-block w-fit">
                        마감일이 지났습니다
                      </span>
                    )}
                  </div>
                ) : (
                  "-"
                )}
              </div>
            </div>
            <div className={tableStyles.row}>
              <div className={cn(tableStyles.label, "align-top")}>첨부파일</div>
              <div className={tableStyles.value}>
                {assignment?.encodedFiles?.length ? (
                  <div className="flex flex-col gap-2">
                    {assignment?.encodedFiles?.map((fileUrl, index) => (
                      <a
                        key={index}
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <MdAttachFile size={16} />
                        <span>첨부파일 {index + 1}</span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">
                    첨부파일이 없습니다.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 과제 제출 섹션 */}
        <div className={cn(cardStyles.base, cardStyles.rounded, "shadow-sm")}>
          <div className={cardStyles.header}>
            <div className={cardStyles.headerTitle}>과제 제출</div>
          </div>

          <div className="p-6 flex flex-col gap-6">
            {isOverdue && !submission && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-700 font-medium">
                  마감일이 지나 과제를 제출할 수 없습니다.
                </p>
              </div>
            )}

            {submission && !isEditing ? (
              // 제출된 과제 보기 모드
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    제출 내역
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      title="수정"
                      onClick={() => {
                        if (!isOverdue) {
                          setIsEditing(true);
                        }
                      }}
                      option={{
                        ...buttonStyles.gray,
                        width: "w-24",
                        background: isOverdue
                          ? "bg-gray-300"
                          : "bg-gray-100 hover:bg-gray-200",
                        textColor: isOverdue
                          ? "text-gray-400"
                          : "text-gray-700",
                      }}
                    />
                    <Button
                      title="삭제"
                      onClick={() => {
                        if (!isOverdue) {
                          handleDelete();
                        }
                      }}
                      option={{
                        ...buttonStyles.red,
                        width: "w-24",
                        background: isOverdue
                          ? "bg-gray-300"
                          : "bg-red-50 hover:bg-red-100",
                        textColor: isOverdue ? "text-gray-400" : "text-red-600",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">내용</p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
                    {submission.content}
                  </p>
                </div>
                {submission.encodedFiles.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">
                      첨부파일
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {submission.encodedFiles.map((fileUrl, index) => (
                        <a
                          key={index}
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          <MdAttachFile size={15} />
                          <span>첨부파일 {index + 1}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : !isOverdue ? (
              // 과제 제출/수정 모드 (마감일이 지나지 않은 경우에만)
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="submissionContent"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    과제 내용
                  </label>
                  <textarea
                    id="submissionContent"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm p-3 h-36 resize-none"
                    placeholder="과제 설명을 입력하세요..."
                    value={submissionContent}
                    onChange={(e) => setSubmissionContent(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    파일 첨부
                  </label>

                  {isEditing && existingFiles.length > 0 && (
                    <div className="p-3 bg-gray-50 rounded-md space-y-2">
                      <p className="text-xs font-medium text-gray-500">
                        기존 파일
                      </p>
                      {existingFiles.map((fileUrl, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-md"
                        >
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900"
                          >
                            <MdAttachFile size={15} />
                            <span className="truncate max-w-xs">
                              첨부파일 {index + 1}
                            </span>
                          </a>
                          <button
                            onClick={() => handleRemoveExistingFile(index)}
                            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                          >
                            <MdClose size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                    accept=".pdf,.doc,.docx,.zip,.txt"
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files) {
                        const filesArray = Array.from(e.dataTransfer.files);
                        setSelectedFiles((prev) => [...prev, ...filesArray]);
                      }
                      e.currentTarget.classList.remove("border-gray-400");
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.add("border-gray-400");
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove("border-gray-400");
                    }}
                    className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-gray-400 transition-colors duration-150 ease-in-out"
                  >
                    <MdAttachFile className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-600">
                      파일을 드래그하거나 클릭하여 업로드하세요.
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      PDF, DOC, DOCX, ZIP, TXT 파일만 가능
                    </p>
                  </div>

                  {selectedFiles.length > 0 && (
                    <div className="p-3 bg-gray-50 rounded-md space-y-2">
                      <p className="text-xs font-medium text-gray-500">
                        새로 추가된 파일
                      </p>
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-md"
                        >
                          <div className="flex items-center gap-1.5">
                            <MdAttachFile className="text-gray-500" size={15} />
                            <span className="text-sm text-gray-700 truncate max-w-xs">
                              {file.name}
                            </span>
                          </div>
                          <button
                            onClick={() => handleRemoveFile(index)}
                            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                          >
                            <MdClose size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2.5">
                  {isEditing && (
                    <Button
                      title="취소"
                      onClick={() => {
                        setIsEditing(false);
                        setSubmissionContent("");
                        setSelectedFiles([]);
                        setExistingFiles([]);
                      }}
                      option={{
                        ...buttonStyles.gray,
                        width: "w-full",
                      }}
                    />
                  )}
                  <Button
                    title={isEditing ? "과제 수정하기" : "과제 제출하기"}
                    onClick={handleSubmit}
                    option={{
                      ...buttonStyles.base,
                      width: "w-full",
                      textColor:
                        !submissionContent.trim() &&
                        selectedFiles.length === 0 &&
                        existingFiles.length === 0
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-white",
                      background:
                        !submissionContent.trim() &&
                        selectedFiles.length === 0 &&
                        existingFiles.length === 0
                          ? "bg-gray-300"
                          : "bg-gray-800 hover:bg-gray-700",
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
