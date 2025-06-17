import { useRef, useEffect } from "react";
import useAssignment from "@/hook/useAssignment";

interface AssignmentListModalProps {
  isOpen: boolean;
  onClose: () => void;
  lectureId: number;
}

export default function AssignmentListModal({
  isOpen,
  onClose,
  lectureId,
}: AssignmentListModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { assignmentsByLecture, isAssignmentByLecture } = useAssignment({ lectureId });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] flex flex-col"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">과제 목록</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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

        <div className="p-6 flex-1 overflow-y-auto">
          {isAssignmentByLecture ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : assignmentsByLecture?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              등록된 과제가 없습니다.
            </div>
          ) : (
            <div className="space-y-4">
              {assignmentsByLecture?.map((assignment) => (
                <div
                  key={assignment.assignmentId}
                  className="bg-gray-50 rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {assignment.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      ID: {assignment.assignmentId}
                    </span>
                  </div>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {assignment.title}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div>
                      <span className="font-medium">제출 기한:</span>{" "}
                      {formatDate(assignment.dueDate)}
                    </div>
                    <div>
                      <span className="font-medium">생성일:</span>{" "}
                      {formatDate(assignment.dueDate)}
                    </div>
                  </div>
                  {false && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        첨부 파일 (0개)
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[].map((_, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            파일 {index + 1}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
